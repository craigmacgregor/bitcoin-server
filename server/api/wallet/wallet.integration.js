'use strict';

var app = require('../../app');
var request = require('supertest');

var newWallet;

describe('Wallet API:', function() {

  describe('GET /api/wallets', function() {
    var wallets;

    beforeEach(function(done) {
      request(app)
        .get('/api/wallets')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          wallets = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      wallets.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/wallets', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/wallets')
        .send({
          name: 'New Wallet',
          info: 'This is the brand new wallet!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newWallet = res.body;
          done();
        });
    });

    it('should respond with the newly created wallet', function() {
      newWallet.name.should.equal('New Wallet');
      newWallet.info.should.equal('This is the brand new wallet!!!');
    });

  });

  describe('GET /api/wallets/:id', function() {
    var wallet;

    beforeEach(function(done) {
      request(app)
        .get('/api/wallets/' + newWallet._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          wallet = res.body;
          done();
        });
    });

    afterEach(function() {
      wallet = {};
    });

    it('should respond with the requested wallet', function() {
      wallet.name.should.equal('New Wallet');
      wallet.info.should.equal('This is the brand new wallet!!!');
    });

  });

  describe('PUT /api/wallets/:id', function() {
    var updatedWallet

    beforeEach(function(done) {
      request(app)
        .put('/api/wallets/' + newWallet._id)
        .send({
          name: 'Updated Wallet',
          info: 'This is the updated wallet!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedWallet = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedWallet = {};
    });

    it('should respond with the updated wallet', function() {
      updatedWallet.name.should.equal('Updated Wallet');
      updatedWallet.info.should.equal('This is the updated wallet!!!');
    });

  });

  describe('DELETE /api/wallets/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/wallets/' + newWallet._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when wallet does not exist', function(done) {
      request(app)
        .delete('/api/wallets/' + newWallet._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
