'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var bookmarkCtrlStub = {
  index: 'bookmarkCtrl.index',
  show: 'bookmarkCtrl.show',
  create: 'bookmarkCtrl.create',
  update: 'bookmarkCtrl.update',
  destroy: 'bookmarkCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var bookmarkIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './bookmark.controller': bookmarkCtrlStub
});

describe('Bookmark API Router:', function() {

  it('should return an express router instance', function() {
    bookmarkIndex.should.equal(routerStub);
  });

  describe('GET /api/bookmarks', function() {

    it('should route to bookmark.controller.index', function() {
      routerStub.get
                .withArgs('/', 'bookmarkCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/bookmarks/:id', function() {

    it('should route to bookmark.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'bookmarkCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/bookmarks', function() {

    it('should route to bookmark.controller.create', function() {
      routerStub.post
                .withArgs('/', 'bookmarkCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/bookmarks/:id', function() {

    it('should route to bookmark.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'bookmarkCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/bookmarks/:id', function() {

    it('should route to bookmark.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'bookmarkCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/bookmarks/:id', function() {

    it('should route to bookmark.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'bookmarkCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
