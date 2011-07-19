/**
 * Module dependencies.
 */

var sys = require('sys');
var style = require('../../colors');
var runGherkin = require('../../brain/run_gherkin');
var express = require('express');
var stylus = require('stylus');
var io = require('socket.io');
var _ = require('underscore')._;

/**
 * runner - web.
 */

process.on('uncaughtException', function (err) {
  if (err.name !== 'AssertionError') {
    if (err.message) {
      console.log(err.stack);
    }
  }
});

var app = express.createServer();
var socket = __peanut__.socket = io.listen(app, {
  flashPolicyServer: false,
  log: function() {}
});

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

app.listen(__peanut__.options.port);

function welcomeMessage() {
  var buf = [];
  buf.push("");
  buf.push(style.blue("  Peanut runner: " +
                      "  Please visit http://localhost:" +
                      __peanut__.options.port));
  buf.push("");
  buf.push("    Features checked: " + style.red(__peanut__.options.path));
  buf.push("");
  if (!__peanut__.envExists) {
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
