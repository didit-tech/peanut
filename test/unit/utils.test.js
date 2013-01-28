/**
 * Module dependencies.
 */

var testHelper = require('../test_helper');
var utils = require('../../lib/utils');
var expect = require('expect.js');

/**
  * test - unit - utils.
  */

describe('utils.nil', function() {
  it('returns true for empty strings', function() {
    expect(utils.nil('')).to.be.true;
  });
});
