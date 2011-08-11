/**
 * Module dependencies.
 */

var formatGherkin = require('./brain/format_gherkin');
var util = require('util');

/**
 * Errors.
 */

__peanut__.error = function(timeoutId, scenario, step, feature, callback) {
  assert.AssertionError = function AssertionError(options) {
    this.name = 'AssertionError';
    this.message = options.message;
    this.actual = options.actual;
    this.expected = options.expected;
    this.operator = options.operator;
    var stackStartFunction = options.stackStartFunction || this;

    if(Error.captureStackTrace)
      Error.captureStackTrace(this, stackStartFunction);

    killStep(timeoutId, scenario, step, feature, callback, this);
  };
  util.inherits(assert.AssertionError, Error);

  assert.AssertionError.prototype.toString = function() {
    if (this.message) {
      return [this.name + ':', this.message].join(' ');
    } else {
      return [this.name + ':',
              JSON.stringify(this.expected),
              this.operator,
              JSON.stringify(this.actual)].join(' ');
    }
  };
  assert.AssertionError.__proto__ = Error.prototype;
};

function killStep(timeoutId, scenario, step, feature, callback, err) {
  clearTimeout(timeoutId);
  scenario._state = 'failed';
  step.showError = true;

  if (step.isBackground) {
    if (!feature.backgroundStepFailed) {
      step.showError = false;
      feature.backgroundStepFailed = true;
    }
  }

  step.errorHeader = formatGherkin.errorHeader(step);
  step.error = err.stack.split("\n");
  __peanut__.formatter.step.failed(step, err);
  callback();
};
