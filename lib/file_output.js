var fs = require('fs')

module.exports.writeTo = function (filePath, callback) {
  fs.writeFile(filePath, JSON.stringify(__peanut__.features), function(err) {
    callback(err);
  });
};