/**
 * Module dependencies.
 */

var sys = require('sys');
var style = require('../colors');

/**
 * formatters - cli.
 */

module.exports = {
  runFeatures: function() {
    sys.puts('Running features\n');
  },
  runTag: function(tag) {
    sys.puts('Running features for tag: ' + tag + '\n');
  },
  feature: function(feature) {
    sys.puts('feature: ' + feature.val.name);
  },
  scenario: function(scenario) {
    sys.puts('  scenario: ' + scenario.name);
  },
  step: {
    failed: function(step) {
      sys.puts(  'Failed step');
    },
    pending: function(step) {
      sys.puts(  'Pending step');
    },
    skipped: function(step) {
      sys.puts(  'Skipped step');
    },
    success: function(step) {
      sys.puts(  'Successful step');
    },
    unimplemented: function(step) {
      sys.puts(  'Unimplemented step');
    }
  }
};
