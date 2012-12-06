/**
 * Module dependencies.
 */

var parser = require("../parser").parser;
var nodes = require('../nodes');
var fs = require('fs');
var http = require('http');
var path = require('path');
var sys = require('util');
var spawn = require('child_process').spawn;
var style = require('../colors');
var utils = require('../utils');
var _ = require('underscore')._;
var async = require('async');
var findit = require('findit');

/**
 * Gherkin Parser.
 */

parser.yy = nodes;

var parseEnvFile = exports.parseEnvFile = function(callback) {
  if (__peanut__.envExists) {
    try {
      var env = require(__peanut__.envPath);
      if (env.peanut) {
        env.peanut(function() {
          callback(null);
        });
      } else {
        callback(null);
      }
    } catch(err) { callback(err); }
  } else {
    callback(null);
  }
};

var parseStepDefinitions = exports.parseStepDefinitions = function() {
  try {
    _(findit.findSync(__peanut__.options.path[0])).each(function(file) {
      if (file.match(/\_steps.js$/) !== null) {
        var correctFilePath = process.cwd() + '/' + file;
        delete require.cache[path.resolve(correctFilePath)];
        require(correctFilePath);
      }
    });
    __peanut__.stepDefinitions = _(__peanut__.stepDefinitions).chain()
      .flatten().unique().value();
  } catch(err) { sys.puts(style.red(err)); }
};

var parseFeatures = exports.parseFeatures = function(callback) {
  async.map(__peanut__.options.path, statPath, function(err, results) {
    var fsStats = _.compact(results);

    async.map(fsStats, processFileOrDir, function(err, results) {
      var results = _(results).chain().flatten().compact().value();
      callback(err, results);
    });

    function processFileOrDir(stats, cb) {
      if (stats.isDirectory()) {
        var files = findit.sync(stats.path);
        async.map(files, parseFeature, function(err, results) {
          cb(err, results);
        });
      };

      if (stats.isFile()) {
        parseFeature(stats.path, cb);
      };
    };
  });

  function statPath(path, cb) {
    fs.stat(path, function(err, stats) {
      if (err) {
        cb(err, stats)
      } else {
        stats.path = path;
        cb(null, stats);
      }
    });
  };
};

function parseFeature(file, callback) {
  if (file.match(/\.feature$/) !== null) {
    fs.readFile(file, 'utf8', function (err, data) {
      if (err) throw err;
      parser.yy.file = new nodes.File();
      var parsedFile = parser.parse(data);
      parsedFile.featureFile = file;

      __peanut__.stepTotal += addStepCounts(parsedFile.feature);
      callback(err, parsedFile)
    });
  } else {
    callback(null);
  }
};

function addStepCounts(feature) {
  var stepCounts = 0;

  _.each(feature.scenarios, function(scenario) {
    if (__peanut__.tag) {
      if (feature.tag) {
        applyCounts(scenario);
      } else {
        if (scenario.tag) {
          if (__peanut__.tag == scenario.tag.replace(/^@/,'')) {
            applyCounts(scenario);
          }
        }
      }
    } else {
      applyCounts(scenario);
    }
  });

  function applyCounts(scenario) {
    var modifier = utils.nil(scenario.examples)
      ? 1 : scenario.examples.length > 0 ? scenario.examples.length : 1;
    stepCounts += scenario.steps.length * modifier;

    if (feature.background) {
      stepCounts += feature.background.steps.length * modifier;
    };
  }

  return stepCounts;
};
