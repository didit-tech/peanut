/**
 * Module dependencies.
 */

var fs = require('fs');
var sys = require('sys');
var style = require('../colors');
var steps = require('../steps');
var runGherkin = require('../brain/run_gherkin');
var argv = require('optimist').argv;
var express = require('express');
var stylus = require('stylus');
var io = require('socket.io');
var _ = require('underscore')._;

/**
 * App.
 */

process.on('uncaughtException', function (err) {
  if (err.name !== 'AssertionError') {
    if (err.message) {
      console.log(err.stack);
    }
  }
});

var app = express.createServer();
var socket = global.socket = io.listen(app, {
  flashPolicyServer: false,
  log: function() {}
});

['Given', 'When', 'Then'].forEach(function(step) {
  global[step] = steps[step];
});

var assert = global.assert = require('assert');
require('../errors');
require('../../support/should');
global.tobi = require('tobi');
global.stepDefinitions = [];

var paths = global.paths = _.isEmpty(argv._) ? ['features'] : argv._;
var throttledTestWithTag = _.throttle(runGherkin.runTestsWithTag, 200);

socket.on('connection', function(client) {
  client.on('message', function(obj) {
    switch(obj.key) {
    case 'rerun all features':
      runGherkin.resetTests();
      runGherkin.runTests();
      break;
    case 'refresh':
      runGherkin.resetTests();
      if (obj.tag)
        throttledTestWithTag(obj.tag);
      else
        runGherkin.runTests();
      break;
    case 'run tag':
      runGherkin.resetTests();
      throttledTestWithTag(obj.tag);
      break;
    };
  });
  client.on('disconnect', function() {});
});

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true);
};

app.use(stylus.middleware({
  src: __dirname + '/views',
  dest: __dirname + '/public',
  compile: compile
}));

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
  res.render('index.jade');
});

app.listen(8282);

global.envExists = true;
try {
  fs.statSync(process.cwd() + '/features/support/env.js');
} catch(err) { global.envExists = false; }

function welcomeMessage() {
  var buf = [];
  buf.push("");
  buf.push(style.blue("  Peanut runner: " +
                      "  Please visit http://localhost:8282"));
  buf.push("");
  buf.push("    Features checked: " + style.red(paths));
  buf.push("");
  if (!global.envExists) {
    buf.push(style.red("    INFO: Could not find features/support/env.js"));
    buf.push(style.red("    If you are testing a webserver, copy this:"));
    buf.push("");
    buf.push(style.green("    module.exports = {"));
    buf.push(style.green("      env: 'development',"));
    buf.push(style.green("      host: 'localhost',"));
    buf.push(style.green("      port: 8000,"));
    buf.push(style.green("      file: 'server.js'"));
    buf.push(style.green("    }"));
    buf.push("");
    buf.push(style.red("    into features/support/env.js"));
  }
  sys.puts(buf.join("\n"));
};

welcomeMessage();
