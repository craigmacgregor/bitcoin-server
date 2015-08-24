/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/wallets              ->  index
 * POST    /api/wallets              ->  create
 * POST    /api/wallets/balance      ->  get total balance
 */

'use strict';

var _ = require('lodash');
var Wallet = require('./wallet.model');

var bitcoin = require('bitcoin');
var client = new bitcoin.Client({
  host: 'localhost',
  port: 8332,
  user: 'bitcoinrpc',
  pass: 'Ctda8mi3KF5FLymNmeA4m5Qo11Bz5TrUR47iGE4XqXq'
});

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Wallets
exports.index = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  client.cmd('listreceivedbyaddress',0,true, function(err, data) {
    if (err) {
      res.status(500).send(err);
    }
    res.send(JSON.stringify(data));
  });
};

// Gets the total balance of all wallets
exports.balance = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  client.cmd('getbalance', function(err, data) {
    if (err) {
      res.status(500).send(err);
    }
    res.send(JSON.stringify(data));
  });
};

// Creates a new Wallet in the daemon
exports.create = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  client.cmd('getnewaddress',function(err, data) {
  if (err) {
    res.status(500).send(err);
  }
    res.send(JSON.stringify(data));
  });
};

// Sends bitcoins to the selected address
exports.send = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  
   //Check Address is valid
   client.cmd('validateaddress', req.body.address, function(err, data) {
    if (err) {
        res.status(500).send(err);
    }
    
    if(data.isvalid === false){
        res.status(500).send(data);
    }else{
                
        //send Bitcoin
        client.cmd('sendtoaddress', req.body.address, parseFloat(req.body.amount), function(err, data) {
            if (err) {
                res.status(500).send(err);
            }
            res.send(JSON.stringify(data));
        });
    }       
   
   });
  
};