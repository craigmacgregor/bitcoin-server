'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var WalletSchema = new Schema({
  address: String,
  balance: String,
  active: Boolean
});

module.exports = mongoose.model('Wallet', WalletSchema);
