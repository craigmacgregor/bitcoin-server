'use strict';

// Register the Babel require hook
require('babel-core/register');

// Export the application
exports = module.exports = require('./app');

var bitcoin = require('bitcoin');
var client = new bitcoin.Client({
  host: 'localhost',
  port: 8332,
  user: 'bitcoinrpc',
  pass: 'Ctda8mi3KF5FLymNmeA4m5Qo11Bz5TrUR47iGE4XqXq'
});
 
client.getDifficulty(function(err, difficulty) {
  if (err) {
    return console.error(err);
  }
 
  console.log('Difficulty: ' + difficulty);
});
