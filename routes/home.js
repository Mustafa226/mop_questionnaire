var express = require('express');
var router = express.Router();
var uuid = require('uuid');
var models = require('../models');

router.get('/', function(req, res, next) {
    res.render('home');
});

module.exports = router;
