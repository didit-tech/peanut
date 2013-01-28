/**
 * Module dependencies.
 */

global.assert = require('assert');
global.should = require('should');
global.expect = require('expect.js');
var sinon = global.sinon = require('sinon');
require('sinon-mocha').enhance(sinon);

/**
 * Terminate process on uncaught exception
 */

process.on('uncaughtException', function(err) {
  console.err(err);
  process.exit(1);
});
