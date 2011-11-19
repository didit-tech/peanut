/**
 * Module dependencies.
 */

var testHelper = require('test_helper');
var describe = testHelper.describe(exports);
var formatter = require('brain/format_gherkin');
var utils = require('utils');
var _ = require('underscore')._;

/**
  * test - unit - feature_formatter.
  */

describe('when formatting an example', function(it) {
  it('replaces one <argument> for one step', function(test) {
    var example = { animal: 'elephant' };
    var scenario = {
      steps: [
        ['Given', 4, 'I have an "<animal>"']
      ]
    };

    var expected = 'I have an "elephant"';
    formatter.formatExample(example, scenario, function (err, scenario) {
      scenario.steps[0][2].should.eql(expected);
      test.finish();
    });
  });

  it('replaces two <arguments> for one step', function(test) {
    var example = { animal: 'mouse', food: 'cheese' };
    var scenario = {
      steps: [
        ['Given', 6, 'I have a "<animal>" who likes "<food>"']
      ]
    };

    var expected = 'I have a "mouse" who likes "cheese"';
    formatter.formatExample(example, scenario, function (err, scenario) {
      scenario.steps[0][2].should.eql(expected);
      test.finish();
    });
  });

  it('replaces two <arguments> for two steps', function(test) {
    var example = { animal: 'mouse', food: 'cheese' };
    var scenario = {
      steps: [
        ['Given', 6, 'I have a "<animal>"'],
        ['Then', 7, 'It should like "<food>"']
      ]
    };

    formatter.formatExample(example, scenario, function (err, scenario) {
      scenario.steps[0][2].should.eql('I have a "mouse"');
      scenario.steps[1][2].should.eql('It should like "cheese"');
      test.finish();
    });
  });

  it('properly replaces <arguments> for multiple examples', function(test) {
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
        scenario.steps[0][2].should.eql('I have a "' + example.animal + '"');
        scenario.steps[1][2].should.eql('It should like "' + example.food + '"');
      });
    });

    test.finish();
  });

  it('replaces two <arguments> for a pystring step', function(test) {
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
      scenario.stepArgs['4'].should.eql(replacedStepArg);
      test.finish();
    });
  });

  it('replaces two <arguments> for a table step', function(test) {
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
      scenario.stepArgs['4'][0][0].should.eql('animal')
      scenario.stepArgs['4'][0][1].should.eql('food');
      scenario.stepArgs['4'][1][0].should.eql('person')
      scenario.stepArgs['4'][1][1].should.eql('horse');
      test.finish();
    });
  });
});

describe('when formatting a step', function(it) {
  var file = { feature: { background: {}}};

  it("should replace text between quotes with a string argument", function(test) {
    test.stub(utils, 'selectStepDefinition').returns({
      pattern : /^the "([^"]*?)" is something$/
    });

    step = ['Given', 4, 'the "argument" is something'];

    var formattedStep = formatter.formatStep(step, {stepArgs: {}}, file);
    formattedStep.stepDefinition.args.should.contain('argument');
    test.finish();
  });

  it("should replace text between quotes with a string containing a single quote", function(test) {
    test.stub(utils, 'selectStepDefinition').returns({
      pattern : /^the "([^"]*?)" is tasty$/
    });

    step = ['Given', 4, 'the "argument\'s pancake" is tasty'];

    var formattedStep = formatter.formatStep(step, {stepArgs: {}}, file);
    formattedStep.stepDefinition.args.should.contain("argument's pancake");
    test.finish();
  });

  it("replaces a number with an argument", function(test) {
    test.stub(utils, 'selectStepDefinition').returns({
      pattern : /^the number (\d+) is everything$/
    });

    step = ['Given', 4, 'the number 42 is everything'];

    var formattedStep = formatter.formatStep(step, {stepArgs: {}}, file);
    formattedStep.stepDefinition.args.should.contain(42);
    test.finish();
  });

  it("replaces two types of arguments correctly", function(test) {
    test.stub(utils, 'selectStepDefinition').returns({
      pattern : /^the number (\d+) is "([^"]*?)"$/
    });

    step = ['Given', 4, 'the number 42 is "everything"'];

    var formattedStep = formatter.formatStep(step, {stepArgs: {}}, file);
    formattedStep.stepDefinition.args.should.contain(42);
    formattedStep.stepDefinition.args.should.contain('everything');
    test.finish();
  });

  it("replaces multiple numbers correctly", function(test) {
    test.stub(utils, 'selectStepDefinition').returns({
      pattern : /^the number (\d+) is greater than (\d+)$/
    });

    step = ['Given', 4, 'the number 42 is greater than 23'];

    var formattedStep = formatter.formatStep(step, {stepArgs: {}}, file);
    formattedStep.pattern.should.eql('the number (\\d+) is greater than (\\d+)')
    formattedStep.stepDefinition.args.should.contain(42);
    formattedStep.stepDefinition.args.should.contain(23);
    test.finish();
  });
});
