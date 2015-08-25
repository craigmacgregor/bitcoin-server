'use strict';

var express = require('express');
var controller = require('./wallet.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/balance', controller.balance);
router.post('/', controller.create);
router.post('/send', controller.send);

module.exports = router;
