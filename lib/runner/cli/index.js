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
      var err = "\n\n" + uncaught + " " + style.red(err.stack) + "\n";
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

/*
  sys.puts("\n");
  step.errorHeader.forEach(function(line) {
    sys.puts(line);
  });
*/

process.on('exit', function() {
  if (__peanut__.testCounts.failed === 0 && __peanut__.testCounts.total > 0) {
    sys.puts("\n");
  }

  if (__peanut__.testCounts.failed > 0) {
    sys.puts("\n");
  }

  sys.puts(style.green("Successful: "
              + __peanut__.testCounts.success) + "\n" +
           style.red("Failed: "
              + __peanut__.testCounts.failed) + "\n" +
           style.yellow("Pending: "
              + __peanut__.testCounts.pending) + "\n" +
           style.blue("Skipped: "
              + __peanut__.testCounts.skipped) + "\n" +
           style.magenta("Unimplemented: "
              + __peanut__.testCounts.unimplemented) + "\n");
});

runGherkin.resetTests();

if (__peanut__.options.tag) {
  runGherkin.runTestsWithTag(__peanut__.options.tag)
} else {
  runGherkin.runTests();
}
