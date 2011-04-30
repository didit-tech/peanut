
/*!
 * peanut - steps
 * Copyright(c) 2011 Didit <developers@didit.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var _ = require('underscore')._;

var Steps = {};

['Given', 'When', 'Then'].forEach(function(step) {
  Steps[step] = function(pattern, callback) {
    stepDefinitions.push({ step: step, pattern: pattern, callback: callback });
  };
});

module.exports = Steps;
