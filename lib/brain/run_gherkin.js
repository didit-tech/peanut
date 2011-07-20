/**
 * Module dependencies.
 */

var formatGherkin = require('./format_gherkin');
var parseGherkin = require('./parse_gherkin');
var Table = require('../table');
var utils = require('../utils');
var _ = require('underscore')._;

/**
 * Gherkin Runner.
 */

var timeout = __peanut__.options.timeout;
var features = {};
var featuresRun = [];
var timeouts = [];
__peanut__.stepTotal = 0;
__peanut__.testCounts = {
  total: 0,
  success: 0,
  failed: 0,
  pending: 0,
  skipped: 0,
  unimplemented: 0
};

var runFeature = function(err, file, callback) {
  var featureVar = utils.toVarName(file.featureFile);
  file.featureVar = featureVar;

  if (!_(featuresRun).include(featureVar)) {
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

    file.broadcastedFeature = broadcastedFeature;
    callback(file);
  }
};

var runScenarios = function(file) {
  var scenarios = file.feature.scenarios;
  if (file.feature.serial) {
    (function next() {
      if (scenarios.length) {
        runScenarioOrExample(scenarios.shift(), scenarios.length, file, next);
      }
    })();
  } else {
    _(file.feature.scenarios).each(function(scenario, index) {
      runScenarioOrExample(scenario, index, file);
    });
  }
};

var runScenarioOrExample = function(scenario, index, file, cb) {
  if (scenario.isOutline) {
    if (file.feature.serial) {
      var examples = scenario.examples;
      (function next() {
        if(examples.length) {
          var example = examples.shift();
          runExample(example, scenario, index, examples.length, file, next);
        } else { cb(); }
      })();
    } else {
      _(scenario.examples).each(function(example, exIdx) {
        runExample(example, scenario, index, exIdx, file, cb);
      });
    }
  } else {
    runScenario(scenario, index, file, cb);
  }
};

var runExample = function(example, scenario, index, exIdx, file, cb) {
  var clonedScenario = utils.deepCopy(scenario);

  delete clonedScenario.examples;
  clonedScenario.exampleClass = 'example' + exIdx;

  formatGherkin.formatExample(example, clonedScenario, function(err, scenario) {
    runScenario(scenario, index, file, cb);
  });
};

var runScenario = function(scenario, index, file, cb) {
  var scenarioIndex = 'scenario' + index;
  var scenarioName = utils.nil(scenario.name) ? 'n/a' : scenario.name;

  var currentScenario = {
    feature: file.featureVar,
    name: scenarioName,
    class: scenarioIndex,
    stepArgs: scenario.stepArgs,
    examples: scenario.examples,
    exampleClass: scenario.exampleClass,
    isOutline: scenario.isOutline
  };

  if (scenario.tag) currentScenario.tag = scenario.tag;

  __peanut__.formatter.scenario(currentScenario);
  features[file.featureVar][scenarioIndex] = {};

  var scenarioState = features[file.featureVar][currentScenario.class];
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
      step, currentScenario, file);
    formattedStep.featureName  = file.feature.name;
    formattedStep.scenarioName = scenarioName;
    return formattedStep;
  });

  (function next() {
    if (formattedSteps.length) {
      runStep(formattedSteps.shift(), scenarioState,
              features[file.featureVar], next);
    } else if (cb) { cb(); }
  })();
};

var runStep = function(step, scenarioState, currentFeature, callback) {
  if (step.unimplemented) {
    __peanut__.formatter.step.unimplemented(step);
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
          __peanut__.formatter.step.failed(step);
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

      __peanut__.error(timeoutId, scenarioState, step,
                       currentFeature, callback);
      step.stepDefinition.callback.apply(scenarioState, stepArgs);
    } else {
      __peanut__.formatter.step.skipped(step);
      callback();
    }
  }
};

var runTests = exports.runTests = function() {
  __peanut__.formatter.runFeatures();
  parseGherkin.parseEnvFile(function(err) {
    parseGherkin.parseStepDefinitions();
    parseGherkin.parseFeatures(function(err, parsedFeatures) {
      _.each(parsedFeatures, function(parsedFile) {
        runFeature(err, parsedFile, function(file) {
          __peanut__.formatter.feature(file.feature);
          featuresRun.push(file.featureVar);
          runScenarios(file);
        });
      });
    });
  });
}

var runTestsWithTag = exports.runTestsWithTag = function(tag) {
  __peanut__.formatter.runTag(tag);
  parseGherkin.parseEnvFile(function(err) {
    parseGherkin.parseStepDefinitions();
    parseGherkin.parseFeatures(function(err, data, parsedFile) {
      runFeature(err, parsedFile, function(file) {
        if (file.feature.tag === '@'+tag) {
          __peanut__.formatter.feature(file.feature);
          runScenarios(file);
          featuresRun.push(file.fv);
        } else {
          var scenarios = _(file.feature.scenarios).select(function(scenario) {
            return scenario.tag === '@'+tag;
          });
          file.feature.scenarios = scenarios;
          __peanut__.formatter.feature(file.feature);
          runScenarios(file);
          featuresRun.push(file.fv);
        }
      });
    });
  });
};

var resetTests = exports.resetTests = function() {
  features = {};
  featuresRun = [];

  __peanut__.stepDefinitions = [];
  __peanut__.stepTotal = 0;
  __peanut__.testCounts = {
    total: 0,
    success: 0,
    failed: 0,
    pending: 0,
    skipped: 0,
    unimplemented: 0
  };

  timeouts.forEach(function(timeoutId) { clearTimeout(timeoutId); });
  timeouts = [];
};
