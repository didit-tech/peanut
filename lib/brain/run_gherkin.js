
/*!
 * peanut - brain - run gherkin
 * Copyright(c) 2011 Didit <developers@didit.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var parser = require("../parser").parser;
var nodes = require('../nodes');
var formatGherkin = require('./format_gherkin');
var parseGherkin = require('./parse_gherkin');
var Table = require('../table');
var utils = require('../utils');
var _ = require('underscore')._;

parser.yy = nodes;

var timeout = 5000;
var features = {};
var featuresRun = [];
var timeouts = [];

var runFeature = exports.runFeature =
function(err, data, featureFile, callback) {
  var featureVar = utils.toVarName(featureFile);

  if (!_(featuresRun).include(featureVar)) {
    parser.yy.file = new nodes.File();
    var file = parser.parse(data);
    features[featureVar] = {};

    var broadcastedFeature = {
      key: 'feature',
      val: {
        class: featureVar,
        name: file.feature.name,
        description: file.feature.description.split("\n")
      }
    };

    if (file.feature.background)
      broadcastedFeature.background = file.feature.background;
    if (file.feature.tag)
      broadcastedFeature.tag = file.feature.tag;

    callback(file, broadcastedFeature, featureVar);
  }
};

var runScenarios = exports.runScenarios = function(file, featureVar) {
  _(file.feature.scenarios).each(function(scenario, index) {
    if (scenario.isOutline) {
      _(scenario.examples).each(function(example, exIdx) {
        runExample(example, scenario, index, exIdx, file, featureVar);
      });
    } else {
      runScenario(scenario, index, file, featureVar);
    }
  });
};

var runExample = exports.runExample =
function(example, scenario, index, exIdx, file, featureVar) {
  var clonedScenario = _.clone(scenario);
  clonedScenario._steps = clonedScenario.steps;
  clonedScenario._args = {};
  delete clonedScenario.examples;
  clonedScenario.exampleClass = 'example' + exIdx;

  clonedScenario.steps = _(clonedScenario.steps).map(function(step) {
    var clonedStep = _.clone(step);
    _(example).each(function(val, key) {
      clonedStep[2] = utils.replaceKeyWithVal(clonedStep[2], key, val);
    });
    return clonedStep;
  });

  _(clonedScenario.stepArgs).each(function(argVal, argKey) {
    _(example).each(function(val, key) {
      if (_.isArray(argVal)) {
        argVal = _(argVal).map(function(line) {
          return _(line).map(function(col) {
            return utils.replaceKeyWithVal(col, key, val);
          });
        });
        clonedScenario._args[argKey] = argVal;
      } else {
        clonedScenario._args[argKey] =
          utils.replaceKeyWithVal(argVal, key, val);
      }
    });
  });

  clonedScenario.stepArgs = clonedScenario._args;
  delete clonedScenario._args;

  runScenario(clonedScenario, index, file, featureVar);
};

var runScenario = exports.runScenario =
function(scenario, index, file, featureVar) {
  var scenarioIndex = 'scenario' + index;
  var scenarioName = utils.nil(scenario.name) ? 'n/a' : scenario.name;

  var currentScenario = {
    feature: featureVar,
    name: scenarioName,
    class: scenarioIndex,
    stepArgs: scenario.stepArgs,
    examples: scenario.examples,
    exampleClass: scenario.exampleClass,
    isOutline: scenario.isOutline
  };

  if (scenario.tag) currentScenario.tag = scenario.tag;
  socket.broadcast({ key: 'scenario', val: currentScenario });
  features[featureVar][scenarioIndex] = {};
  var curScenario = features[featureVar][currentScenario.class];

  if (file.feature.background) {
    var steps = _.map(_.clone(file.feature.background.steps), function(s) {
      s[3] = 'Background';
      return s;
    });
    var ss = currentScenario.isOutline ?
      _.clone(scenario._steps) : _.clone(scenario.steps);
    _.each(ss, function(s) { steps.push(s); });
  } else { var steps = _.clone(scenario.steps); }

  var formattedSteps = _(steps).map(function(step) {
    var formattedStep = formatGherkin.formatStep(
      step, currentScenario, featureVar);
    formattedStep.featureName  = file.feature.name;
    formattedStep.scenarioName = scenarioName;
    return formattedStep;
  });

  (function next() {
    if (formattedSteps.length) {
      runStep(formattedSteps.shift(), curScenario,
              features[featureVar], next);
    }
  })();
};

var runStep = exports.runStep =
function(step, currentScenario, currentFeature, callback) {
  if (step.unimplemented) {
    socket.broadcast({ key: 'unimplemented step', val: step });
    currentScenario._unimplemented = true;
    callback();
  } else {
    if (!currentScenario._unimplemented &&
        currentScenario._state !== 'failed') {
      var timeoutId;
      var stepIsRunning = true;
      try {
        timeoutId = setTimeout(function() {
          stepIsRunning = false;
          clearTimeout(timeoutId);
          if (currentScenario._state !== 'failed') {
            step.showError = true;

            if (step.isBackground) {
              if (!currentFeature.backgroundStepFailed) {
                step.showError = false;
                currentFeature.backgroundStepFailed = true;
              }
            }

            currentScenario._state = 'failed';
            step.errorHeader = formatGherkin.errorHeader(step);
            step.error = ['Step timed out after ' + timeout + ' ms'];
            socket.broadcast({ key: 'failed step', val: step });
          }
          callback();
        }, timeout);
        timeouts.push(timeoutId);
        var stepCallback = utils.createStepCallback(
          step, timeoutId, stepIsRunning, currentScenario,callback);
        var stepArgs = [stepCallback].concat(step.stepDefinition.args);
        if (step.type === 'table')
          stepArgs.push(new Table(step.tableOrPyString));
        if (step.type === 'pystring')
          stepArgs.push(step.tableOrPyString);
        step.stepDefinition.callback.apply(currentScenario, stepArgs);
      } catch (err) {
        clearTimeout(timeoutId);
        currentScenario._state = 'failed';
        step.showError = true;

        if (step.isBackground) {
          if (!currentFeature.backgroundStepFailed) {
            step.showError = false;
            currentFeature.backgroundStepFailed = true;
          }
        }

        step.errorHeader = formatGherkin.errorHeader(step);
        step.error = err.stack.split("\n");
        socket.broadcast({ key: 'failed step', val: step });
        callback();
      }
    } else {
      socket.broadcast({ key: 'skipped step', val: step });
      callback();
    }
  }
};

var runTests = exports.runTests = function() {
  socket.broadcast({ key: 'run features' });
  parseGherkin.parseStepDefinitions();
  parseGherkin.parseFeatures(function(err, data, featureFile) {
    runFeature(err, data, featureFile, function(file, feature, fv) {
      socket.broadcast(feature);
      runScenarios(file, fv);
      featuresRun.push(fv);
    });
  });
}

var runTestsWithTag = exports.runTestsWithTag = function(tag) {
  socket.broadcast({ key: 'run tag' });
  parseGherkin.parseStepDefinitions();
  parseGherkin.parseFeatures(function(err, data, featureFile) {
    runFeature(err, data, featureFile, function(file, feature, fv) {
      if (feature.tag === '@'+tag) {
        socket.broadcast(feature);
        runScenarios(file, fv);
        featuresRun.push(fv);
      } else {
        var scenarios = _(file.feature.scenarios).select(function(scenario) {
          return scenario.tag === '@'+tag;
        });
        file.feature.scenarios = scenarios;
        socket.broadcast(feature);
        runScenarios(file, fv);
        featuresRun.push(fv);
      }
    });
  });
};

var resetTests = exports.resetTests = function() {
  features = {};
  featuresRun = [];
  stepDefinitions = [];
  timeouts.forEach(function(timeoutId) { clearTimeout(timeoutId); });
  timeouts = [];
};
