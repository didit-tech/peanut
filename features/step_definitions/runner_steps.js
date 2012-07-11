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

Given(/^I have a Scenario with an "([^"]*?)"$/, function(step, stepArgString) {
  this.stepArgString = stepArgString;
  step.done();
});

Given(/^I have a Scenario with an (.*)$/, function(step, stepArgNumber) {
  this.stepArgNumber = stepArgNumber;
  step.done();
});

When(/^my arg equals "([^"]*?)"$/, function(step, arg) {
  this.argValue = arg;
  step.done();
});

Then(/^the Pystring should be "([^"]*?)"$/, function(step, expectedPystring) {
  this.actualPyString.should.include(expectedPystring);
  step.done();
});

Then(/^I should have a table header of "([^"]*?)"$/, function(step, tableHeader) {
  this.actualTable.headers()[0].should.eql(tableHeader);
  step.done();
});

Then(/^the argument should be "([^"]*?)"$/, function(step, stepArgString) {
  _.isString(stepArgString).should.be.true;
  this.stepArgString.should.eql(stepArgString);
  step.done();
});

Then(/^the argument should be (.*)$/, function(step, stepArgNumber) {
  _.isNumber(stepArgNumber).should.be.true;
  this.stepArgNumber.should.eql(stepArgNumber);
  step.done();
});

Then(/^it should have the first Scenario's value$/, function(step) {
  this.argValue.should.eql("First Scenario");
  step.done();
});

Then(/^it should have the second Scenario's value$/, function(step) {
  this.argValue.should.eql("Second Scenario");
  step.done();
});

Then(/^it should have the third Scenario's value$/, function(step) {
  this.argValue.should.eql("Third Scenario");
  step.done();
});
