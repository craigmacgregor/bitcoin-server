'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var BoomarkSchema = new Schema({
  name: String,
  address: String
});

module.exports = mongoose.model('Bookmark', BoomarkSchema);
