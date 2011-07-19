/**
 * Module dependencies.
 */

var sys = require('sys');
var style = require('../../colors');
var runGherkin = require('../../brain/run_gherkin');

/**
 * runner - web.
 */

__peanut__.failed = [];
__peanut__.uncaught = {};
__peanut__.unimplemented = [];
var uncaught = 0;

process.on('uncaughtException', function (err) {
  if (err.name !== 'AssertionError') {
    if (err.message) {
      uncaught++;
      var err = "\n\n" + uncaught + ": " + style.red(err.stack) + "\n";
      __peanut__.uncaught[uncaught] = { err: err };
      sys.puts(err);
    }
  }
});

process.on('SIGINT', function () {
  if (__peanut__.testCounts.failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
});

process.on('exit', function() {
  __peanut__.formatter.results();
});

runGherkin.resetTests();

if (__peanut__.options.tag) {
  runGherkin.runTestsWithTag(__peanut__.options.tag)
} else {
  runGherkin.runTests();
}
