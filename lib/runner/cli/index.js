/**
 * Module dependencies.
 */

var sys = require('sys');
var style = require('../../colors');
var runGherkin = require('../../brain/run_gherkin');

/**
 * runner - web.
 */

process.on('uncaughtException', function (err) {
  if (__peanut__.options.failfast) {
    console.log("\n%s", style.red(err.stack));
    process.exit(0)
  } else {
    if (err.name !== 'AssertionError') {
      if (err.message) {
        console.log("\n%s", style.red(err.stack));
      }
    }
  }
});

runGherkin.resetTests();

if (__peanut__.options.tag) {
  runGherkin.runTestsWithTag(__peanut__.options.tag)
} else {
  runGherkin.runTests();
}
