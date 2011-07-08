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

/**
 * Gherkin Runner.
 */

parser.yy = nodes;

var timeout = 5000;
var features = {};
var featuresRun = [];
var timeouts = [];

var runFeature = function(err, data, featureFile, callback) {
  var featureVar = utils.toVarName(featureFile);

  if (!_(featuresRun).include(featureVar)) {
    parser.yy.file = new nodes.File();
    var file = parser.parse(data);
    features[featureVar] = {
      timeout: file.feature.timeout
        ? file.feature.timeout * 1000
        : timeout
    };

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

var runScenarios = function(file, featureVar) {
  var scenarios = file.feature.scenarios;
  if (file.feature.serial) {
    (function next() {
      if (scenarios.length) {
        runScenarioOrExample(scenarios.shift(), scenarios.length, file, featureVar, next);
      }
    })();
  } else {
    _(file.feature.scenarios).each(function(scenario, index) {
      runScenarioOrExample(scenario, index, file, featureVar);
    });
  }
};

var runScenarioOrExample = function(scenario, index, file, featureVar, cb) {
  if (scenario.isOutline) {
    _(scenario.examples).each(function(example, exIdx) {
      runExample(example, scenario, index, exIdx, file, featureVar, cb);
    });
  } else {
    runScenario(scenario, index, file, featureVar, cb);
  }
};

var runExample = function(example, scenario, index, exIdx, file, featureVar, cb) {
  var clonedScenario = utils.deepCopy(scenario);
  delete clonedScenario.examples;
  clonedScenario.exampleClass = 'example' + exIdx;

  formatGherkin.formatExample(example, clonedScenario, function(err, scenario) {
    runScenario(scenario, index, file, featureVar, cb);
  });
};

var runScenario = function(scenario, index, file, featureVar, cb) {
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

  var scenarioState = features[featureVar][currentScenario.class];
  scenarioState._state = 'running';

  if (file.feature.background) {
    var steps = _.map(_.clone(file.feature.background.steps), function(s) {
      if (s[3] === undefined) s[3] = undefined;
      if (s[4] === undefined) s[4] = undefined;
      s[5] = 'Background';
      return s;
    });
    _.each(scenario.steps, function(s) { steps.push(s); });
  } else {
    var steps = scenario.steps;
  }

  var formattedSteps = _(steps).map(function(step) {
    var formattedStep = formatGherkin.formatStep(
      step, currentScenario, featureVar, file);
    formattedStep.featureName  = file.feature.name;
    formattedStep.scenarioName = scenarioName;
    return formattedStep;
  });

  (function next() {
    if (formattedSteps.length) {
      runStep(formattedSteps.shift(), scenarioState,
              features[featureVar], next);
    } else if (cb) { cb(); }
  })();
};

var runStep = function(step, scenarioState, currentFeature, callback) {
  if (step.unimplemented) {
    socket.broadcast({ key: 'unimplemented step', val: step });
    scenarioState._unimplemented = true;
    callback();
  } else {
    if (!scenarioState._unimplemented &&
        scenarioState._state !== 'failed') {
      var timeoutId;
      var stepIsRunning = true;
      timeoutId = setTimeout(function() {
        stepIsRunning = false;
        clearTimeout(timeoutId);
        if (scenarioState._state !== 'failed') {
          step.showError = true;

          if (step.isBackground) {
            if (!currentFeature.backgroundStepFailed) {
              step.showError = false;
              currentFeature.backgroundStepFailed = true;
            }
          }

          scenarioState._state = 'failed';
          step.errorHeader = formatGherkin.errorHeader(step);
          step.error = [
            'Step timed out after ' + currentFeature.timeout + ' ms'
          ];
          socket.broadcast({ key: 'failed step', val: step });
        }
        callback();
      }, currentFeature.timeout);
      timeouts.push(timeoutId);
      var stepCallback = utils.createStepCallback(
        step, timeoutId, stepIsRunning, scenarioState, callback);
      var stepArgs = [stepCallback].concat(step.stepDefinition.args);
      if (step.type === 'table')
        stepArgs.push(new Table(step.tableOrPyString));
      if (step.type === 'pystring')
        stepArgs.push(step.tableOrPyString);

      error(timeoutId, scenarioState, step, currentFeature, callback);
      step.stepDefinition.callback.apply(scenarioState, stepArgs);
    } else {
      socket.broadcast({ key: 'skipped step', val: step });
      callback();
    }
  }
};

var runTests = exports.runTests = function() {
  socket.broadcast({ key: 'run features' });
  parseGherkin.parseEnvFile(function(err) {
    parseGherkin.parseStepDefinitions();
    parseGherkin.parseFeatures(function(err, data, featureFile) {
      runFeature(err, data, featureFile, function(file, feature, fv) {
        socket.broadcast(feature);
        runScenarios(file, fv);
        featuresRun.push(fv);
      });
    });
  });
}

var runTestsWithTag = exports.runTestsWithTag = function(tag) {
  socket.broadcast({ key: 'run tag' });
  parseGherkin.parseEnvFile(function(err) {
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
  });
};

var resetTests = exports.resetTests = function() {
  features = {};
  featuresRun = [];
  stepDefinitions = [];
  timeouts.forEach(function(timeoutId) { clearTimeout(timeoutId); });
  timeouts = [];
};
