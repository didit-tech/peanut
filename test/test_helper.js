/**
 * Module dependencies.
 */

require('should');
global.assert = require('assert');
var sinon = require('sinon');

module.exports = function(exports) {
  return function(statement, callback) {
    exports[statement] = function(done) {
      var sandbox = sinon.sandbox.create();
      sandbox.finish = function() {
        sandbox.restore();
        done();
      };
      callback(sandbox);
    };
  };
};

/**
 * Terminate process on uncaught exception
 */

process.on('uncaughtException', function(err) {
  process.exit(1);
});
