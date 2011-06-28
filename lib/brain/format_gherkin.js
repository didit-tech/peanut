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

var formatStep = exports.formatStep = function(step, scenario, feature, file) {
  var opts = { feature: feature };
  opts.isBackground = formatStepBackground(step);
  opts.stepType     = formatStepType(step);
  var step          = parameterizeStep(step);
  var stepDef       = utils.selectStepDefinition(step);

  return formattedStep(step, stepDef, scenario, opts, file);
};

var formattedStep = exports.formattedStep =
function(step, stepDef, scenario, opts, file) {
  var _formattedStep = {
    args: step[6],
    feature: opts.feature,
    isBackground: opts.isBackground,
    lineno: step[1],
    pattern: step[5],
    scenario: scenario.class,
    step: step[0],
    text: step[2],
    type: opts.stepType,
    unimplemented: utils.nil(stepDef) ? true: false,
    unimplementedStep: step[3]
  };

  _formattedStep = formatStepOutline(_formattedStep, scenario);
  _formattedStep = formatStepArgs(_formattedStep, stepDef, scenario, file);

  return _formattedStep;
};

var parameterizeStep = exports.parameterizeStep = function(_step) {
  // inspect(_step);
  var step  = _.clone(_step);
  var regex = step[2];
  var args  = [];
  regex = regexReplaceNumbers(regex, args);
  regex = regexReplaceStrings(regex, args);
  regex = regexReplaceTables(regex, args);
  if (utils.nil(step[3])) step[3] = step[0];
  step[5] = regex;
  step[6] = [''].concat(args).join(', ');

  return step;
};

var formatStepArgs = exports.formatStepArgs =
function(step, stepDef, scenario, file) {
  if (step.isBackground) {
    var background = file.feature.background;
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

  if (!utils.nil(stepDef)) {
    step.stepDefinition = stepDef;
    step.stepDefinition.args = stepDef.pattern.exec(step.text).slice(1);
  }

  return step;
};

var formatStepBackground = exports.formatStepBackground = function(step) {
  if (step[5] === 'Background') {
    delete step[5];
    return true;
  } else {
    return false;
  }
};

var formatStepOutline = exports.formatStepOutline = function(step, scenario) {
  if (scenario.isOutline) {
    step.exampleClass = scenario.exampleClass;
  }
  return step;
};

var formatStepType = exports.formatStepType = function(step) {
  if (step[4] === 'PYSTRING') return 'pystring';
  else if (step[4] === 'TABLE') return 'table';
  else return 'normal';
};

var regexReplaceNumbers = exports.regexReplaceNumbers = function(re, args) {
  return re.replace(/(\s|^)(\d+\.?\d+)(\s|$)/, function(str, m1, m2, m3) {
    args.push('arg' + (args.length + 1));
    return m1 + '(.*)' + m3;
  });
};

var regexReplaceStrings = exports.regexReplaceStrings = function(re, args) {
  return re.replace(/("[^"]*?")/g, function(str, m1) {
    args.push('arg' + (args.length + 1));
    return '"([^"]*?)"';
  });
};

var regexReplaceTables = exports.regexReplaceTables = function(re, args) {
  return re.replace(/(\s|^)(<\S+>)(\s|$)/, function(str, m1, m2, m3) {
    args.push('arg' + (args.length + 1));
    return m1 + '(.*)' + m3;
  });
};

var errorHeader = exports.errorHeader = function(step) {
  return [
    'Feature: '  + step.featureName,
    'Scenario: ' + step.scenarioName,
    'Step: '     + step.step + ' ' + step.text
  ];
};
