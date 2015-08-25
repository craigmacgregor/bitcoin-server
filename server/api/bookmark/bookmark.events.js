/**
 * Bookmark model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Bookmark = require('./bookmark.model');
var BookmarkEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BookmarkEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Bookmark.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BookmarkEvents.emit(event + ':' + doc._id, doc);
    BookmarkEvents.emit(event, doc);
  }
}

module.exports = BookmarkEvents;
