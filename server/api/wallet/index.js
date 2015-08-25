'use strict';

var express = require('express');
var controller = require('./wallet.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/balance', controller.balance);

module.exports = router;
