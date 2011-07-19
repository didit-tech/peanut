/**
 * Module dependencies.
 */

var sys = require('sys');
var style = require('../colors');

/**
 * formatters - cli.
 */

var dots = 0;
var uncaught = 0;

module.exports = {
  runFeatures: function() {
    sys.puts('Running features\n');
  },
  runTag: function(tag) {
    sys.puts('Running features for tag: ' + tag + '\n');
  },
  feature: function(feature) {

  },
  scenario: function(scenario) {

  },
  step: {
    failed: function(step) {
      sys.print(style.red('.'));
      if (++dots % 50 === 0) sys.print('\n');

      if (step.error[0].indexOf('Step timed out after') >= 0) {
        uncaught++;
        __peanut__.uncaught[uncaught].step = step;
      } else {
        __peanut__.failed.push(step);
      }

      __peanut__.testCounts.failed++;
      __peanut__.testCounts.total++;
    },
    pending: function(step) {
      sys.print(style.yellow('.'));
      if (++dots % 50 === 0) sys.print('\n');

      __peanut__.testCounts.pending++;
      __peanut__.testCounts.total++;
    },
    skipped: function(step) {
      sys.print(style.blue('.'));
      if (++dots % 50 === 0) sys.print('\n');

      __peanut__.testCounts.skipped++;
      __peanut__.testCounts.total++;
    },
    success: function(step) {
      sys.print(style.green('.'));
      if (++dots % 50 === 0) sys.print('\n');

      __peanut__.testCounts.success++;
      __peanut__.testCounts.total++;
    },
    unimplemented: function(step) {
      sys.print(style.magenta('.'));
      if (++dots % 50 === 0) sys.print('\n');

      __peanut__.unimplemented.push(step);
      __peanut__.testCounts.unimplemented++;
      __peanut__.testCounts.total++;
    }
  }
};
