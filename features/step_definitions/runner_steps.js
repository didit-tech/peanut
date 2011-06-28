/**
 * Module dependencies.
 */

var _ = require('underscore')._;
var inspect = require('eyes').inspector({});

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
