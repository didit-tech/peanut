var fs = require('fs');
var _ = require('underscore');
var xmlBuilder = require('xmlbuilder');

module.exports.writeTo = function (filePath, callback) {
  var xml = createXmlFor(__peanut__.features);
  fs.writeFile(filePath, xml.toString({ pretty: true }), function(err) {
    callback(err);
  });
};

var createXmlFor = function(features) {
  var xmlDoc = xmlBuilder.create();

  var xmlNode = xmlDoc.begin('testsuites');
  _.each(features, function(feature, featureName) {
    buildFeatureNode(featureName, feature, xmlNode);
  });

  return xmlDoc;
}

var buildFeatureNode = function(featureName, feature, xmlNode) {
  var featureNode = xmlNode.ele('testsuite')
    .att('hostname', 'peanut')
    .att('name', featureName)
    .att('time', 42)
    .att('timestamp', new Date().toString())
    .att('errors', 0)
    .att('failures', __peanut__.testCounts.failed)
    .att('tests', __peanut__.testCounts.total);

  _.each(feature, function(step) {
    buildStepNode(step, featureNode);
  });
}

var buildStepNode = function(step, featureNode) {
  var stepNode = featureNode.ele('testcase')
    .att('classname', step.scenarioName)
    .att('name', step.stepName)
    .att('time', 0.0042);

  if (step.error) {
    var type = step.error[0].indexOf('Step timed out') >= 0
      ? 'TimeoutError'
      : 'AssertionError';
  
    stepNode.ele('failure')
      .att('message', step.error[0])
      .att('type', type)
      .txt(step.error.join('\n'))
    .up();
  }
};