/**
 * Module dependencies.
 */

var Table = require('../table');
var utils = require('../utils');
var _ = require('underscore')._;
var inspect = require('eyes').inspector({});

/**
 * Gherkin Formatter.
 */

exports.formatExample = function(example, scenario, callback) {
  scenario.steps = replaceExampleArgsForSteps(example, scenario.steps);
  scenario.stepArgs = replaceExampleArgsForStepArgs(example, scenario.stepArgs);
  callback(null, scenario);
};

var replaceExampleArgsForSteps = function(example, steps) {
  _(steps).each(function(step, i) {
    steps[i][2] = replaceExampleInString(step[2], example);
  });
  return steps;
};

var replaceExampleArgsForStepArgs = function(example, stepArgs) {
  var formattedStepArgs = {};
  _(stepArgs).each(function (argVal, argKey) {
    if (_.isString(argVal)) {
      formattedStepArgs[argKey] = replaceExampleInString(argVal, example);
    }
    if (_.isArray(argVal)) {
      formattedStepArgs[argKey] = replaceExampleInArray(argVal, example);
    }
  });
  return formattedStepArgs;
};

var replaceExampleInArray = function(argValue, example) {
  return _(argValue).map(function(row) {
    return _(row).map(function(value) {
      return replaceExampleInString(value, example);
    });
  });
};

var replaceExampleInString = function(argValue, example) {
  _(example).each(function(val, key){
    argValue = utils.replaceKeyWithVal(argValue, key, val);
  });
  return argValue;
};

var formatStep = exports.formatStep = function(step, scenario, feature, file) {
  var stepDefinition = utils.selectStepDefinition(step);

  var formattedStep = {
    args: '',
    feature: feature,
    isBackground: formatStepBackground(step),
    lineno: step[1],
    scenario: scenario.class,
    step: step[0],
    stepDefinition: stepDefinition,
    text: step[2],
    type: formatStepType(step),
    unimplemented: utils.nil(stepDefinition),
    unimplementedStep: utils.nil(step[3]) ? step[0] : step[3]
  };

  formattedStep = formatStepOutline(formattedStep, scenario);
  formattedStep = parameterizeStep(formattedStep);
  formattedStep = setTableOrPystringArgs(formattedStep, scenario,
     formattedStep.isBackground, file.feature.background);

  return formattedStep;
};

var parameterizeStep = function(step) {
  if (step.stepDefinition === undefined) {
    step.stepDefinition = { args: []};
  }
  step.stepDefinition.args = {};
  step.pattern = step.text;
  step.pattern = regexReplaceNumbers(step);
  step.pattern = regexReplaceStrings(step);

  step.stepDefinition.args = _(step.stepDefinition.args).values();
  return step;
};

var setTableOrPystringArgs = function(step, scenario, isBackground, background) {
  if (isBackground) {
    if (background.stepArgs[step.lineno]) {
      step.tableOrPyString = background.stepArgs[step.lineno];
      step.args += ', ' + step.type;
    }
  } else {
    if (scenario.stepArgs[step.lineno]) {
      step.tableOrPyString = scenario.stepArgs[step.lineno];
      step.args += ', ' + step.type;
    }
  }

  return step;
};

var formatStepBackground = function(step) {
  if (step[5] === 'Background') {
    delete step[5];
    return true;
  } else {
    return false;
  }
};

var formatStepOutline = function(step, scenario) {
  if (scenario.isOutline) {
    step.exampleClass = scenario.exampleClass;
  }
  return step;
};

var formatStepType = function(step) {
  if (step[4] === 'PYSTRING') return 'pystring';
  else if (step[4] === 'TABLE') return 'table';
  else return 'normal';
};

var regexReplaceNumbers = function(step) {
  var stepArgs = step.stepDefinition.args;
  var pattern = /(\d+)/
  return step.pattern.replace(pattern, function(str, m1, offset) {
    step.args += ', arg';
    stepArgs[offset] = parseInt(m1);
    return pattern.source;
  });
};

var regexReplaceStrings = function(step) {
  var pattern = /"([^"]*?)"/g
  var stepArgs = step.stepDefinition.args;

  return step.pattern.replace(pattern, function(str, m1, offset) {
    step.args += ', arg';
    stepArgs[offset] = m1;
    return '"([^"]*?)"';
  });
};

var errorHeader = exports.errorHeader = function(step) {
  return [
    'Feature: '  + step.featureName,
    'Scenario: ' + step.scenarioName,
    'Step: '     + step.step + ' ' + step.text
  ];
};
