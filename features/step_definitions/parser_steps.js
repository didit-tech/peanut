require('should');
var util = require('util');
var parser = require("../../lib/parser").parser;
var nodes = require("../../lib/nodes");
var _ = require('underscore')._;

Given(/^the feature file is$/, function(step, featureText) {
  this.text = featureText.join("\n");
  step.done();
});

When(/^the file is parsed$/, function(step) {
  parser.yy.file = new nodes.File();
  this.parsedFile = parser.parse(this.text);
  step.done();
});

Then(/^the Feature should be named "([^"]*?)"$/, function(step, featureName) {
  this.parsedFile.feature.name.should.eql(featureName);
  step.done();
});

Then(/^it should have a Scenario called "([^"]*?)"$/,
  function(step, scenarioName) {
    this.parsedFile.feature.scenarios[0].name.should.eql(scenarioName);
    step.done();
  }
);

Then(/^it should have the following Steps:$/, function(step, stepNames) {
  var steps = this.parsedFile.feature.scenarios[0].steps;
  _(stepNames.hashes()).each(function(step, i) {
    step['Name'].should.eql(steps[i][0] + ' ' + steps[i][2]);
  });
  step.done();
});

Then(/^it should have a Background$/, function(step) {
  this.parsedFile.feature.should.have.property('background');
  step.done();
});

Then(/^the Background should have the following Steps:$/,
  function(step, stepNames) {
    var steps = this.parsedFile.feature.background.steps;
    _(stepNames.hashes()).each(function(step, i) {
      step['Name'].should.eql(steps[i][0] + ' ' + steps[i][2]);
    });
    step.done();
  }
);
