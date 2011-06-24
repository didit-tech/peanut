/**
 * Module dependencies.
 */

var _ = require('underscore')._;

/**
 * Table.
 */

var Table = module.exports = function(table) {
  this.raw = table;
};

Table.prototype.hashes = function() {
  var self = this;
  return _.map(_.rest(self.raw), function(row) {
    var line = {};
    _.each(self.headers(), function(header, hindex) {
      line[header] = row[hindex];
    });
    return line;
  });
};

Table.prototype.headers = function() {
  return this.raw[0];
};

Table.prototype.rows_hash = function() {
  var self = this;
  var rows_hash = {};
  _.each(arguments[0] || self.raw, function(row) {
    rows_hash[row[0]] = row[1];
  });
  return rows_hash;
};

Table.prototype.transpose = function() {
  var w = this.raw.length ? this.raw.length : 0;
  var h = this.raw[0] instanceof Array ? this.raw[0].length : 0;

  if(h === 0 || w === 0) { return []; }

  var i, j, t = [];

  for(i=0; i<h; i++) {
    t[i] = [];
    for(j=0; j<w; j++) {
      t[i][j] = this.raw[j][i];
    }
  }

  return t;
};

Table.prototype.transposed_hash = function() {
  return this.rows_hash(this.transpose());
};
