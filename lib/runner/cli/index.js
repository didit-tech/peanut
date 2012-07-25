/**
 * Module dependencies.
 */

var sys = require('util');
var output = require('../../file_output')
var style = require('../../colors');
var runGherkin = require('../../brain/run_gherkin');


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
  beenUncaught = Object.keys(__peanut__.uncaught).length > 0;
  process.emit('exit');
});

process.on('exit', function() {
  if (!exited) {
    if (__peanut__.options.output) {
      output.writeTo(__peanut__.options.output, function() { exit(); });
    } else {
      __peanut__.formatter.results(function() { exit(); });
    }
  }
});

function exit() {
  exited = true;
  setTimeout(function() {
    if (__peanut__.testCounts.failed > 0 || beenUncaught) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  }, 100);
};

if (__peanut__.options.tag) {
  __peanut__.options.tag.indexOf('~') === 0 
    ? runGherkin.runTestsExceptTag(__peanut__.options.tag.substring(1))
    : runGherkin.runTestsWithTag(__peanut__.options.tag)
} else {
  runGherkin.runTests();
}
