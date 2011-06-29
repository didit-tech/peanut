/**
 * Module dependencies.
 */

var _ = require('underscore')._;

/**
 * Steps.
 */

Given(/^I have a Pystring with$/, function(step, pystring) {
  this.actualPyString = pystring;
  step.done();
});

Given(/^I have a Table with$/, function(step, table) {
  this.actualTable = table;
  step.done();
});

Then(/^the Pystring should be "([^"]*?)"$/, function(step, expectedPystring) {
  this.actualPyString.should.include.string(expectedPystring);
  step.done();
});

Then(/^I should have a table header of "([^"]*?)"$/, function(step, tableHeader) {
  this.actualTable.headers()[0].should.eql(tableHeader);
  step.done();
});

Given(/^I have a Scenario with an "([^"]*?)"$/, function(step, stepArgString) {
  this.stepArgString = stepArgString;
  step.done();
});

Then(/^the argument should be "([^"]*?)"$/, function(step, stepArgString) {
  _.isString(stepArgString).should.be.true;
  this.stepArgString.should.eql(stepArgString);
  step.done();
});

Given(/^I have a Scenario with an (.*)$/, function(step, stepArgNumber) {
  this.stepArgNumber = stepArgNumber;
  step.done();
});

Then(/^the argument should be (.*)$/, function(step, stepArgNumber) {
  _.isNumber(stepArgNumber).should.be.true;
  this.stepArgNumber.should.eql(stepArgNumber);
  step.done();
});
