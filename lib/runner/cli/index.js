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
__peanut__.SIGINT = false;
var exited = false;
var beenUncaught = false;
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
  __peanut__.SIGINT = true;
  beenUncaught = Object.keys(__peanut__.uncaught).length > 0;
  exit();
});

process.on('exit', function() {
  if (!exited) {
    if (!__peanut__.SIGINT) {
      __peanut__.formatter.results(function() {
        exit();
      });
    } else {
      sys.puts('');
      exit();
    }
  }
});

runGherkin.resetTests();

if (__peanut__.options.tag) {
  runGherkin.runTestsWithTag(__peanut__.options.tag)
} else {
  runGherkin.runTests();
}

function exit() {
  exited = true;
  if (__peanut__.testCounts.failed > 0 || beenUncaught) {
    process.exit(1);
  } else {
    process.exit(0);
  }
};