var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function (req, res) {
    models.Questionnaire.findAndCountAll({include: [{model: models.Question}]}).then(function (searchResult) {
        var total = searchResult.count;
        res.render('guestquestionnaires', {questionnaires: searchResult.rows});
    });
});

module.exports = router;