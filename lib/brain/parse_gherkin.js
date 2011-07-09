/**
 * Module dependencies.
 */

var fs = require('fs');
var http = require('http');
var path = require('path');
var sys = require('sys');
var spawn = require('child_process').spawn;
var style = require('../colors');
var _ = require('underscore')._;
var findit = require('findit');

/**
 * Gherkin Parser.
 */

var parseEnvFile = exports.parseEnvFile = function(callback) {
  if (global.envExists) {
    try {
      var env = require(process.cwd() + '/features/support/env');
      if (env.env && env.file && env.host && env.port) {
        setupTestServer(env, callback)
      } else { callback(null); }
    } catch(err) { callback(err); }
  } else {
    callback(null);
  }
};

function setupTestServer (env, callback) {
  process.env['NODE_ENV'] = env.env;
  global.BASE_URL = 'http://' + env.host + ':' + env.port;
  var testServer = spawn('node', [env.file], { cwd: process.cwd() });

  var interval = setInterval(function() {
    http.get({ host: env.host, port: env.port, path: '/' }, function(res) {
      callback(null);
      clearInterval(interval);
    }).on('error', function(e) {
      // callback if timeout after 5000 ms
    });
  }, 100);
};

var parseStepDefinitions = exports.parseStepDefinitions = function() {
  try {
    _(findit.findSync('features')).each(function(file) {
      if (file.match(/\_steps.js$/) !== null) {
        var correctFilePath = process.cwd() + '/' + file;
        delete require.cache[path.resolve(correctFilePath)];
        require(correctFilePath);
      }
    });
    stepDefinitions = _(stepDefinitions).chain().flatten().unique().value();
  } catch(err) { sys.puts(style.red(err)); }
};

var parseFeatures = exports.parseFeatures = function(callback) {
  _(paths).each(function(path) {
    fs.stat(path, function(err, stats) {
      if (stats) {
        if (stats.isDirectory()) {
          var finder = findit.find(path);
          finder.on('directory', function (dir) { });
          finder.on('file', function (file) {
            parseFeature(file, callback);
          });
        }
        if (stats.isFile()) {
          parseFeature(path, callback);
        }
      }
    });
  });
};

var parseFeature = exports.parseFeature = function(file, callback) {
  if (file.match(/\.feature$/) !== null) {
    fs.readFile(file, 'utf8', function (err, data) {
      if (err) throw err;
      callback(err, data, file)
    });
  }
};
