
/*!
 * peanut - utils
 * Copyright(c) 2011 Didit <developers@didit.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var path = require('path');
var _ = require('underscore')._;

exports.nil = function(attr) {
  return _.isUndefined(attr) || _.isEmpty(attr);
};

exports.replaceKeyWithVal = function(str, key, val) {
  return str.replace(new RegExp('<'+key+'>','g'), val);
};

exports.toVarName = function(fileName) {
  var fileName = path.normalize(fileName);
  return fileName.replace('.feature','').replace('/','_').replace(' ','_');
};

exports.createStepCallback =
function(step, timeoutId, isRunning, scenario, callback) {
  return {
    done: function() {
      if (isRunning) {
        clearTimeout(timeoutId);
        socket.broadcast({ key: 'successful step', val: step });
        callback();
      }
    },
    pending: function() {
      if (isRunning) {
        clearTimeout(timeoutId);
        scenario._state = 'failed';
        socket.broadcast({ key: 'pending step', val: step });
        callback();
      }
    },
  };
};

exports.selectStepDefinition = function(step) {
  var _stepDef = _(stepDefinitions).select(function(stepDefinition) {
    return stepDefinition.step === step[3] &&
           stepDefinition.pattern.exec(step[2]) !== null;
  })[0];
  return _.clone(_stepDef);
};
