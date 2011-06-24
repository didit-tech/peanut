/**
 * Module dependencies.
 */

var testHelper = require('test_helper');
var describe = testHelper.describe(exports);
var utils = require('utils');

/**
  * test - unit - utils.
  */

describe('utils.nil', function(it) {
  it('returns true for empty strings', function(test) {
    utils.nil('').should.be.true;
    test.finish();
  });
});
