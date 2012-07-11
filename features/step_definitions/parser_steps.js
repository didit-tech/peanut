/**
 * Module dependencies.
 */

var util = require('util');
var parser = require(__dirname + "/../../lib/parser").parser;
var nodes = require(__dirname + "/../../lib/nodes");
var _ = require('underscore')._;
parser.yy = nodes;

/**
 * Steps.
 */

Given(/^the Feature header is:$/, function(step, featureHeader) {
  this.fileText = featureHeader;
  step.done();
});

Given(/^the Feature contains$/, function(step, featureText) {
  this.fileText += featureText;
  step.done();
});

Given(/^the last Step has "([^"]*?)" as a Pystring$/, function(step, pyString) {
  this.fileText += '"""' + "\n" + pyString + "\n" + '"""';
  step.done();
});

When(/^the Feature is parsed$/, function(step) {
  parser.yy.file = new nodes.File();
  var parsedFile = parser.parse(this.fileText);

  this.feature = parsedFile.feature;
  this.background = parsedFile.feature.background;
  this.scenario = parsedFile.feature.scenarios[0];

  step.done();
});

Then(/^the Feature should be named "([^"]*?)"$/, function(step, featureName) {
  this.feature.name.should.eql(featureName);
  step.done();
});

Then(/^it should have a Scenario called "([^"]*?)"$/,
  function(step, scenarioName) {
    _(this.feature.scenarios).pluck('name').should.include(scenarioName);
    step.done();
  }
);

Then(/^it should have the following Steps:$/, function(step, stepNames) {
  var steps = this.scenario.steps;
  _(stepNames.hashes()).each(function(step, i) {
    step['Name'].should.eql(steps[i][0] + ' ' + steps[i][2]);
  });
  step.done();
});

Then(/^it should have a Background$/, function(step) {
  this.feature.should.have.property('background');
  step.done();
});

Then(/^the Background should have the following Steps:$/,
  function(step, stepNames) {
    var steps = this.background.steps;
    _(stepNames.hashes()).each(function(step, i) {
      step['Name'].should.eql(steps[i][0] + ' ' + steps[i][2]);
    });
    step.done();
  }
);

Then(/^line (\d+) should have a Pystring argument "([^"]*?)"$/,
  function(step, lineno, pyStringArg) {
    var stepArgs = this.scenario.stepArgs;
    stepArgs[lineno].should.include(pyStringArg);
    step.done();
  }
);

Then(/^the background should have a Pystring argument "([^"]*?)" at line (\d+)$/, function(step, pyStringArg, lineno) {
  var stepArgs = this.background.stepArgs;
  stepArgs[lineno].should.include(pyStringArg);
  step.done();
});

Then(/^line (\d+) should have the following Table argument$/, function(step, lineno, table) {
  var stepArgs = this.scenario.stepArgs;
  stepArgs[lineno].should.eql(table.raw);
  step.done();
});

Then(/^the background should have the following table at line (\d+)$/, function(step, lineno, table) {
  var stepArgs = this.background.stepArgs;
  stepArgs[lineno].should.eql(table.raw);
  step.done();
});

Then(/^the Scenario should be tagged with "([^"]*?)"$/, function(step, tagName) {
  this.scenario.tag.should.include(tagName);
  step.done();
});

Then(/^the Scenario Outline should have (\d+) examples$/, function(step, exampleCount) {
  this.scenario.examples.length.should.eql(exampleCount);
  step.done();
});

Then(/^Example (\d+) "([^"]*?)" should be "([^"]*?)"$/, function(step, exampleno, header, val) {
  this.scenario.examples[exampleno][header].should.eql(val);
  step.done();
});

Then(/^the Feature should be marked as serial$/, function(step) {
  this.feature.serial.should.be.true;
  step.done();
});

Then(/^the Feature should have a timeout of (\d+) seconds$/, function(step, timeout) {
  this.feature.timeout.should.eql(timeout);
  step.done();
});

Then(/^the Feature should be tagged as "([^"]*?)"$/, function(step, tagName) {
  this.feature.tag.should.include(tagName);
  step.done();
});

Then(/^print some stuff$/, function(step) {
  console.log('some stuff');
  step.done();
});
