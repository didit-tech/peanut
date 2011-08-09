/**
 * Module dependencies.
 */

var sys = require('sys');
var style = require('../colors');
var _ = require('underscore')._;

/**
 * formatters - cli.
 */

var dots = 0;
var uncaught = 0;

var addToTotals = function() {
  __peanut__.testCounts.total++;
  if (__peanut__.stepTotal === __peanut__.testCounts.total) {
    process.emit('exit');
  }
};

var recordStep = function(step, ran, passed) {
  var feature = __peanut__.features[step.featureName];
  if (!feature) feature = __peanut__.features[step.featureName] = {};

  var scenario = feature[step.scenarioName];
  if (!scenario) scenario = feature[step.scenarioName] = {};

  var step = { skipped: true, passed: false };
  if (ran) step.skipped = false;
  if (passed) step.passed = true;
  scenario[step.text] = step;
}

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
      sys.print(style.red('F'));
      if (++dots % 50 === 0) sys.print('\n');

      if (step.error[0].indexOf('Step timed out after') >= 0) {
        if (!_.isUndefined(__peanut__.uncaught[uncaught + 1])) {
          uncaught++;
          __peanut__.uncaught[uncaught].step = step;
        } else {
          __peanut__.failed.push(step);
        }
      } else {
        __peanut__.failed.push(step);
      }

      __peanut__.testCounts.failed++;
      addToTotals();
      recordStep(step, true, false);
    },
    pending: function(step) {
      sys.print(style.yellow('.'));
      if (++dots % 50 === 0) sys.print('\n');

      __peanut__.testCounts.pending++;
      addToTotals();
      recordStep(step, false);
    },
    skipped: function(step) {
      sys.print(style.blue('.'));
      if (++dots % 50 === 0) sys.print('\n');

      __peanut__.testCounts.skipped++;
      addToTotals();
      recordStep(step, false);
    },
    success: function(step) {
      sys.print(style.green('.'));
      if (++dots % 50 === 0) sys.print('\n');

      __peanut__.testCounts.success++;
      addToTotals();
      recordStep(step, true, true);
    },
    unimplemented: function(step) {
      sys.print(style.magenta('.'));
      if (++dots % 50 === 0) sys.print('\n');

      var markedAsUnimplemented =
        _.select(__peanut__.unimplemented, function(unimplemented) {
          return unimplemented.pattern === step.pattern;
        }).length > 0;

      if (!markedAsUnimplemented) {
        __peanut__.unimplemented.push(step);
        __peanut__.testCounts.unimplemented++;
      }

      addToTotals();
      recordStep(step, false);
    }
  },

  results: function(callback) {
    if (__peanut__.testCounts.failed === 0 && __peanut__.testCounts.total > 0) {
      sys.puts("\n");
    }

    if (__peanut__.testCounts.failed > 0) {
      sys.puts("\n");
    }

    sys.puts(style.green("Successful: "
                + __peanut__.testCounts.success));
    sys.puts(style.red("Failed: "
                + __peanut__.testCounts.failed));

    if (_.keys(__peanut__.uncaught).length > 0) {
      sys.puts('');
      sys.puts(style.red('Timeout Failures:'));
      sys.puts('');

      _(__peanut__.uncaught).each(function(val, key) {
        if (val.step) {
          sys.puts(style.red(key) + ':');
          val.step.errorHeader.forEach(function(line) {
            sys.puts(line);
          });
        }
      });
      sys.puts('');
    };

    if (__peanut__.failed.length > 0) {
      sys.puts('');
      sys.puts(style.red('Non-Timeout Failures:'));

      __peanut__.failed.forEach(function(failed) {
        sys.puts('');
        failed.errorHeader.forEach(function(line) {
          sys.puts(line);
        });
        sys.puts('');
        failed.error.forEach(function(line) {
          sys.puts(style.red(line));
        });
        sys.puts('');
      });
    };

    sys.puts(style.yellow("Pending: "
                + __peanut__.testCounts.pending));
    sys.puts(style.blue("Skipped: "
                + __peanut__.testCounts.skipped));
    sys.puts(style.magenta("Unimplemented: "
                + __peanut__.testCounts.unimplemented));

    if (__peanut__.unimplemented.length > 0) {
      __peanut__.unimplemented.forEach(function(unimplemented) {
        sys.puts('');
        sys.puts(style.magenta(unimplemented.unimplementedStep +
          '(/^' + unimplemented.pattern + '$/, function(step' +
          unimplemented.args + ') {'));
        sys.puts(style.magenta('  step.pending();'));
        sys.puts(style.magenta('});'));
      });
    };

    sys.puts('');
    callback();
  }
};
