/**
 * Module dependencies.
 */

var formatGherkin = require('./brain/format_gherkin');
var util = require('util');

/**
 * Errors.
 */

process.on('uncaughtException', killStep)

function killStep(err) {
  var state = __peanut__.state
  clearTimeout(state.id);
  state.scenario._state = 'failed';
  state.step.showError = true;

  if (state.step.isBackground) {
    if (!state.feature.backgroundStepFailed) {
      state.step.showError = false;
      state.feature.backgroundStepFailed = true;
    }
  }

  state.step.errorHeader = formatGherkin.errorHeader(state.step);
  state.step.error = err.stack.split("\n");
  __peanut__.formatter.step.failed(state.step);
  state.callback();
};
