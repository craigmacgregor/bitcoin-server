'use strict';

var app = require('../../app');
var request = require('supertest');

var newBoomark;

describe('Boomark API:', function() {

  describe('GET /api/bookmarks', function() {
    var bookmarks;

    beforeEach(function(done) {
      request(app)
        .get('/api/bookmarks')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          bookmarks = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      bookmarks.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/bookmarks', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/bookmarks')
        .send({
          name: 'New Boomark',
          info: 'This is the brand new bookmark!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newBoomark = res.body;
          done();
        });
    });

    it('should respond with the newly created bookmark', function() {
      newBoomark.name.should.equal('New Boomark');
      newBoomark.info.should.equal('This is the brand new bookmark!!!');
    });

  });

  describe('GET /api/bookmarks/:id', function() {
    var bookmark;

    beforeEach(function(done) {
      request(app)
        .get('/api/bookmarks/' + newBoomark._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          bookmark = res.body;
          done();
        });
    });

    afterEach(function() {
      bookmark = {};
    });

    it('should respond with the requested bookmark', function() {
      bookmark.name.should.equal('New Boomark');
      bookmark.info.should.equal('This is the brand new bookmark!!!');
    });

  });

  describe('PUT /api/bookmarks/:id', function() {
    var updatedBoomark

    beforeEach(function(done) {
      request(app)
        .put('/api/bookmarks/' + newBoomark._id)
        .send({
          name: 'Updated Boomark',
          info: 'This is the updated bookmark!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBoomark = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBoomark = {};
    });

    it('should respond with the updated bookmark', function() {
      updatedBoomark.name.should.equal('Updated Boomark');
      updatedBoomark.info.should.equal('This is the updated bookmark!!!');
    });

  });

  describe('DELETE /api/bookmarks/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/bookmarks/' + newBoomark._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when bookmark does not exist', function(done) {
      request(app)
        .delete('/api/bookmarks/' + newBoomark._id)
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
