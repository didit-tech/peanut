/**
 * formatters - cli.
 */

module.exports = {
  runFeatures: function() {
    __peanut__.socket.broadcast({ key: 'run features' });
  },
  runTag: function(tag) {
    __peanut__.socket.broadcast({ key: 'run tag' });
  },
  feature: function(feature) {
    __peanut__.socket.broadcast(feature);
  },
  scenario: function(scenario) {
    __peanut__.socket.broadcast({ key: 'scenario', val: scenario });
  },
  step: {
    failed: function(step) {
      __peanut__.socket.broadcast({ key: 'failed step', val: step });
    },
    pending: function(step) {
      __peanut__.socket.broadcast({ key: 'pending step', val: step });
    },
    skipped: function(step) {
      __peanut__.socket.broadcast({ key: 'skipped step', val: step });
    },
    success: function(step) {
      __peanut__.socket.broadcast({ key: 'successful step', val: step });
    },
    unimplemented: function(step) {
      __peanut__.socket.broadcast({ key: 'unimplemented step', val: step });
    }
  }
};
