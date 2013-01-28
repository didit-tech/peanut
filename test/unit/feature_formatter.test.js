/**
 * Module dependencies.
 */

var testHelper = require('../test_helper');
var formatter = require('../../lib/brain/format_gherkin');
var utils = require('../../lib/utils');
var _ = require('underscore')._;

/**
  * test - unit - feature_formatter.
  */

describe('when formatting an example', function() {
  it('replaces one <argument> for one step', function(done) {
    var example = { animal: 'elephant' };
    var scenario = {
      steps: [
        ['Given', 4, 'I have an "<animal>"']
      ]
    };

    var expected = 'I have an "elephant"';
    formatter.formatExample(example, scenario, function (err, scenario) {
      expect(scenario.steps[0][2]).to.be(expected);
      done();
    });
  });

  it('replaces two <arguments> for one step', function(done) {
    var example = { animal: 'mouse', food: 'cheese' };
    var scenario = {
      steps: [
        ['Given', 6, 'I have a "<animal>" who likes "<food>"']
      ]
    };

    var expected = 'I have a "mouse" who likes "cheese"';
    formatter.formatExample(example, scenario, function (err, scenario) {
      expect(scenario.steps[0][2]).to.be(expected);
      done();
    });
  });

  it('replaces two <arguments> for two steps', function(done) {
    var example = { animal: 'mouse', food: 'cheese' };
    var scenario = {
      steps: [
        ['Given', 6, 'I have a "<animal>"'],
        ['Then', 7, 'It should like "<food>"']
      ]
    };

    formatter.formatExample(example, scenario, function (err, scenario) {
      expect(scenario.steps[0][2]).to.be('I have a "mouse"');
      expect(scenario.steps[1][2]).to.be('It should like "cheese"');
      done();
    });
  });

  it('properly replaces <arguments> for multiple examples', function(done) {
    var examples = [
      { animal: 'moose', food: 'ice cream' },
      { animal: 'yak', food: 'shaving cream' }
    ];
    var scenario = {
      steps: [
        ['Given', 6, 'I have a "<animal>"'],
        ['Then', 7, 'It should like "<food>"']
      ]
    };

    _(examples).each(function(example) {
      var clonedScenario = utils.deepCopy(scenario);
      formatter.formatExample(example, clonedScenario, function (err, scenario) {
        expect(scenario.steps[0][2]).to.be('I have a "' + example.animal + '"');
        expect(scenario.steps[1][2]).to.be('It should like "' + example.food + '"');
      });
    });

    done();
  });

  it('replaces two <arguments> for a pystring step', function(done) {
    var example = { animal: 'cat', food: 'mice' };
    var scenario = {
      steps: [
        ['Given', 4, 'I have a pystring', undefined, 'PYSTRING']
      ],
      stepArgs: {
        '4': '     my <animal> really likes to munch on <food>.\n    '
      }
    };

    formatter.formatExample(example, scenario, function (err, scenario) {
      var replacedStepArg = '     my cat really likes to munch on mice.\n    ';
      expect(scenario.stepArgs['4']).to.be(replacedStepArg);
      done();
    });
  });

  it('replaces two <arguments> for a table step', function(done) {
    var example = { animal: 'person', food: 'horse' };
    var scenario = {
      steps: [
        ['Given', 4, 'I have a table', undefined, 'TABLE']
      ],
      stepArgs: {
        '4': [
          [ 'animal', 'food' ],
          [ '<animal>', '<food>']
        ]
      }
    };

    formatter.formatExample(example, scenario, function (err, scenario) {
      expect(scenario.stepArgs['4'][0][0]).to.be('animal');
      expect(scenario.stepArgs['4'][0][1]).to.be('food');
      expect(scenario.stepArgs['4'][1][0]).to.be('person');
      expect(scenario.stepArgs['4'][1][1]).to.be('horse');
      done();
    });
  });
});

describe('when formatting a step', function() {
  var file = { feature: { background: {}}};

  it("should replace text between quotes with a string argument", function(done) {
    sinon.stub(utils, 'selectStepDefinition').returns({
      pattern : /^the "([^"]*?)" is something$/
    });

    var step = ['Given', 4, 'the "argument" is something'];

    var formattedStep = formatter.formatStep(step, {stepArgs: {}}, file);
    expect(formattedStep.stepDefinition.args).to.contain('argument');
    done();
  });

  it("should replace text between quotes with a string containing a single quote", function(done) {
    sinon.stub(utils, 'selectStepDefinition').returns({
      pattern : /^the "([^"]*?)" is tasty$/
    });

    var step = ['Given', 4, 'the "argument\'s pancake" is tasty'];

    var formattedStep = formatter.formatStep(step, {stepArgs: {}}, file);
    expect(formattedStep.stepDefinition.args).to.contain("argument's pancake");
    done();
  });

  it("replaces a number with an argument", function(done) {
    sinon.stub(utils, 'selectStepDefinition').returns({
      pattern : /^the number (\d+) is everything$/
    });

    var step = ['Given', 4, 'the number 42 is everything'];

    var formattedStep = formatter.formatStep(step, {stepArgs: {}}, file);
    expect(formattedStep.stepDefinition.args).to.contain(42);
    done();
  });

  it("replaces two types of arguments correctly", function(done) {
    sinon.stub(utils, 'selectStepDefinition').returns({
      pattern : /^the number (\d+) is "([^"]*?)"$/
    });

    var step = ['Given', 4, 'the number 42 is "everything"'];

    var formattedStep = formatter.formatStep(step, {stepArgs: {}}, file);
    expect(formattedStep.stepDefinition.args).to.contain(42);
    expect(formattedStep.stepDefinition.args).to.contain('everything');
    done();
  });

  it("replaces multiple numbers correctly", function(done) {
    sinon.stub(utils, 'selectStepDefinition').returns({
      pattern : /^the number (\d+) is greater than (\d+)$/
    });

    var step = ['Given', 4, 'the number 42 is greater than 23'];

    var formattedStep = formatter.formatStep(step, {stepArgs: {}}, file);
    expect(formattedStep.pattern).to.be('the number (\\d*\\.)?(\\d+) is greater than (\\d*\\.)?(\\d+)')
    expect(formattedStep.stepDefinition.args).to.contain(42);
    expect(formattedStep.stepDefinition.args).to.contain(23);
    done();
  });

  it("replaces floats", function(done) {
    sinon.stub(utils, 'selectStepDefinition').returns({
      pattern: /^I have <exp> amount of money$/
    });

    var step = ['Given', 4, 'I have 25.34 amount of money'];

    var formattedStep = formatter.formatStep(step, {stepArgs: {}}, file);
    expect(formattedStep.stepDefinition.args).to.contain(25.34);
    done();
  });
});

