var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function (req, res) {
    models.Questionnaire.findAndCountAll().then(function (searchResult) {
        var total = searchResult.count;
        res.render('questionnaires', {questionnaires: searchResult.rows});
    });
});

router.post('/add-questionnaire', function (req, res) {
    models.Questionnaire.create({
        questionnaire: req.body.questionnaire
    }).then(function (questionnaire) {
        res.redirect('/questionnaires/' + questionnaire.id);
    }).catch(function (reason) {
        console.error(reason);
        res.status(500).send('There was an error!');
    });
});

router.get('/:id', function (req, res) {
    models.Questionnaire.findById(req.params.id, {include: [{model: models.Question}]})
        .then(function (questionnaire) {
            if (!questionnaire) {
                res.status(500).send('Cannot find questionnaire!');
            } else {
                models.Question.findAndCountAll().then(function (searchResult) {
                    var total = searchResult.count;
                    res.render('questionnaire', {questionnaire: questionnaire, questions: searchResult.rows});
                });
            }
        });
});

router.get('/:questionnaireId/question/:questionId', function (req, res) {
    models.QuestionnaireQuestion.create({
        QuestionnaireId : req.params.questionnaireId,
        QuestionId : req.params.questionId
    }).then(function (questionnaireQuestion) {
        res.redirect('/questionnaires/' + req.params.questionnaireId);
    }).catch(function (reason) {
        console.error(reason);
        res.status(500).send('There was an error!');
    });
});

router.get('/take', function (req, res) {
    models.Questionnaire.findAndCountAll().then(function (searchResult) {
        var total = searchResult.count;
        res.render('questionnaires', {questionnaires: searchResult.rows});
    });
});

module.exports = router;