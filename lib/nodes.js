/**
 * Module dependencies.
 */

var util = require("util");
var events = require("events");
var _ = require('underscore')._;

/**
 * Nodes.
 */

var File = exports.File = function() {
  this.ast = [];
  this.state = 'INITIAL';
  this.prevState = '';
  this.vars = {};
  this.feature = {
    description: '',
    scenarios: []
  };
  events.EventEmitter.call(this);
};

util.inherits(File, events.EventEmitter);

File.prototype.currentScenario = function() {
  return this.feature.scenarios[this.vars.currentScenarioIndex];
};

File.prototype.currentStep = function() {
  if (this.vars.currentScenarioIndex === undefined) {
    return this.feature.background.steps[this.vars.backgroundStepIndex];
  } else {
    return this.feature.scenarios[this.vars.currentScenarioIndex].
      steps[this.vars.currentStepIndex];
  }
};

File.prototype.setScenarioIndex = function() {
  delete this.vars.prevStepType;
  this.vars.currentScenarioIndex = this.feature.scenarios.length - 1;
};

File.prototype.setStepIndex = function() {
  this.vars.currentStepIndex = this.feature.
    scenarios[this.vars.currentScenarioIndex].steps.length - 1;
};

File.prototype.setBackgroundStepIndex = function() {
  this.vars.backgroundStepIndex = this.feature.background.steps.length - 1;
};

File.prototype.cleanRow = function(row) {
  return _(row.split('|')).chain().compact().invoke('trim').value();
};

File.prototype.popState = function() {
  this.state = this.prevState;
};

File.prototype.pushStepArg = function(val) {
  this.vars.currentScenarioIndex === undefined
    ? this.feature.background.stepArgs[this.vars.currentStepLine] = val
    : this.currentScenario().stepArgs[this.vars.currentStepLine] = val;
};

File.prototype.captureFitTables = function(token) {
  var self = this;
  if (this.state !== 'EXAMPLES') {
    this.currentStep()[4] = 'TABLE';

    var table = _(token[2].split("\n")).map(function(line) {
      return self.cleanRow(line.trim());
    });
    this.pushStepArg(table)
  }
};

File.prototype.capturePyString = function(token) {
  this.currentStep()[4] = 'PYSTRING';
  this.pushStepArg(this.formatPyString(token[2]));
};

File.prototype.formatPyString = function(rawPystring) {
  return rawPystring.replace(/^"""\n|"""\s*$/g, '');
};

File.prototype.captureScenarioExamples = function(token) {
  var self = this;
  if (token[2].match(/^(Examples|Scenarios):/)) {
    this.emit('stateChange', 'EXAMPLES');
    delete self.vars.exampleHeaders;
  }
  if (self.state === 'EXAMPLES') {
    if (token[2].match(/^\|/)) {
      if (self.vars.exampleHeaders) {
        var exampleRow = {};
        _(self.cleanRow(token[2])).each(function(item, index) {
          exampleRow[self.vars.exampleHeaders[index]] = item;
        });
        self.currentScenario().examples.push(exampleRow);
      } else {
        self.vars.exampleHeaders = self.cleanRow(token[2]);
      }
    }
  }
};

var EOF = exports.EOF = function(file) {
  delete file.vars;
  return file;
};

var genNode = function(name, callback) {
  exports[name] = function(file, token) {
    if (callback) callback(file, token);
    file.ast.push(token);
    file.prevToken = token;
  };
};

genNode('Feature', function(file, token) {
  file.state = 'FEATURE';

  file.on('stateChange', function(state) {
    file.prevState = file.state;
    file.state = state;
  });
});

genNode('Background', function(file, token) {
  file.emit('stateChange', 'BACKGROUND');
  file.feature.background = {
    lineno: token[1],
    steps: [],
    stepArgs: {}
  };
});

genNode('Scenario', function(file, token) {
  file.emit('stateChange', 'SCENARIO');
  file.feature.scenarios.push({
    lineno: token[1],
    steps: [],
    stepArgs: {}
  });
  file.setScenarioIndex();
});

genNode('Outline', function(file, token) {
  file.emit('stateChange', 'OUTLINE');
  file.feature.scenarios.push({
    lineno: token[1],
    steps: [],
    examples: [],
    stepArgs: {},
    isOutline: true
  });
  file.setScenarioIndex();
});

genNode('Step');

genNode('Tag', function(file, token) {
  switch(token[0]) {
  case 'FEATURE_TAG':
    file.feature.tag = token[2];
    break;
  case 'SCENARIO_TAG':
    file.currentScenario().tag = token[2];
    break;
  case 'OUTLINE_TAG':
    file.currentScenario().tag = token[2];
    break;
  };
});

genNode('Line', function(file, token) {
  switch(token[0]) {
  case 'FEATURE_DESCRIPTION':
    file.feature.name = token[2];
    break;
  case 'BACKGROUND_DESCRIPTION':
    file.feature.background.name = token[2];
    break;
  case 'SCENARIO_DESCRIPTION':
  case 'OUTLINE_DESCRIPTION':
    file.currentScenario().name = token[2];
    break;
  case 'STEP_DESCRIPTION':
    var stepToken = [file.prevToken[2], token[1], token[2]];
    file.vars.currentStepLine = token[1];

    if (file.prevToken[2] === 'And' || file.prevToken[2] === 'But') {
      if (file.vars.prevStepType !== undefined) {
        stepToken[3] = file.vars.prevStepType;
      }
    } else {
      file.vars.prevStepType = file.prevToken[2];
    }

    if (file.state === 'BACKGROUND') {
      file.feature.background.steps.push(stepToken);
      file.setBackgroundStepIndex();
    } else {
      file.currentScenario().steps.push(stepToken);
      file.setStepIndex();
    }

    break;
  case 'LINE':
    if (file.state === 'FEATURE') {
      file.feature.description += token[2] + "\n";
    }

    if (file.currentScenario() !== undefined) {
      if (file.currentScenario().isOutline) {
        file.captureScenarioExamples(token);
      }
    }

    break;
  };
});

genNode('Pystring', function(file, token) {
  file.capturePyString(token);
});

genNode('Table', function(file, token) {
  file.captureFitTables(token);
});


genNode('Newline');
genNode('Comment');
