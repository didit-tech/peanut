
/*!
 * peanut - brain - parse gherkin
 * Copyright(c) 2011 Didit <developers@didit.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var fs = require('fs');
var path = require('path');
var sys = require('sys');
var style = require('../colors');
var findit = require('findit');
var _ = require('underscore')._;

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
