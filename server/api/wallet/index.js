'use strict';

var express = require('express');
var controller = require('./wallet.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);

module.exports = router;
