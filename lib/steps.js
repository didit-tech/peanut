/**
 * Module dependencies.
 */

var _ = require('underscore')._;

/**
 * Steps.
 */

var Steps = {};

['Given', 'When', 'Then'].forEach(function(step) {
  Steps[step] = function(pattern, callback) {
    stepDefinitions.push({ step: step, pattern: pattern, callback: callback });
  };
});

module.exports = Steps;
