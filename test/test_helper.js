/**
 * Module dependencies.
 */

require('should');
global.assert = require('assert');
var sinon = require('sinon');

module.exports = {
  describe: function(exports) {
    var self = this;
    return function(subject, callback) {
      var testContext = {};
      testContext.subject = subject;
      callback(self.it(exports, testContext));
    };
  },
  it: function(exports, testContext) {
    return function(statement, callback) {
      exports[testContext.subject + ' ' + statement] = function(done) {
        var sandbox = sinon.sandbox.create();
        sandbox.finish = function() {
          sandbox.restore();
          done();
        };
        callback(sandbox);
      };
    };
  }
};

/**
 * Terminate process on uncaught exception
 */

process.on('uncaughtException', function(err) {
  process.exit(1);
});
