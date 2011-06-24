require('should');
var util = require('util');
var parser = require("../../lib/parser").parser; 
var nodes = require("../../lib/nodes"); 

Given(/^the feature file is $/, function(step, featureText) {
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

Then(/^it should have a Scenario called "([^"]*?)"$/, function(step, scenarioName) {
	this.parsedFile.feature.scenarios[0].name.should.eql(scenarioName);
  step.done();
});

Then(/^it should have the following Steps:$/, function(step, stepNames) {
  console.log(stepNames.rows_hash())
	console.log(stepNames.hashes())
	console.log(stepNames.headers())
	step.pending();
});