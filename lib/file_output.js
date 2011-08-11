var fs = require('fs');
var _ = require('underscore');

module.exports.writeTo = function (filePath, callback) {
  var xmlString = createXmlFor(__peanut__.features);
  fs.writeFile(filePath, JSON.stringify(__peanut__.features), function(err) {
    callback(err);
  });
};

var createXmlFor = function(features) {
  var result = '';
  
}