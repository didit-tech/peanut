/**
 * Module dependencies.
 */

var sys = require('util');
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
  sys.puts(buf.join("\n"));
};

welcomeMessage();
