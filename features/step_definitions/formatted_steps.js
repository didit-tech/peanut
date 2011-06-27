/**
 * Module dependencies.
 */

var inspect = require('eyes').inspector({});
var gherkinFormatter = require('../../lib/brain/format_gherkin');
var _ = require('underscore')._;

var convertVal = function(val) {
  if (_.isNumber(parseInt(val))) return parseInt(val);
  if (val === 'undefined') return undefined;
  if (val === 'true') return true;
  return val;
};

/**
 * Steps.
 */

Given(/^the Step AST is$/, function(step, table) {
  this.token = _(table.raw[1]).map(function(key) {
    return convertVal(key);
  });
  step.done();
});

Given(/^the step's Pystring is$/, function(step, pystring) {
  this.file = {
    feature: {
      background: {
        stepArgs: {}
      }
    },
  }
  this.file.feature.background.stepArgs[this.token[1]] = pystring;
  step.done();
});

When(/^the Step is formatted$/, function(step) {
  this.formattedToken = gherkinFormatter.formatStep(
    this.token, {}, {}, this.file);
  step.done();
});

Then(/^the formatted Step should include:$/, function(step, table) {
  var self = this;
  _(table.rows_hash()).each(function(val, key) {
    _.isString(convertVal(val))
      ? self.formattedToken[key].should.include.string(val)
      : self.formattedToken[key].should.eql(convertVal(val));
  });
  step.done();
});
