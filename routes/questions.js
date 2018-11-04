var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function (req, res) {
    models.Question.findAndCountAll()
        .then(function (searchResult) {
            var total = searchResult.count;
            res.render('questions', {
                questions: searchResult.rows
            })
        });
});

router.post('/add-question', function (req, res) {
    models.Question.create({
        question: req.body.question
    }).then(function (question) {
        res.redirect('/questions/' + question.id);
    }).catch(function (reason) {
        console.error(reason);
        res.status(500).send('There was an error!');
    });
});

router.get('/:id', function (req, res) {
    models.Question.findById(req.params.id, {include: [{model: models.Choice}]})
        .then(function (question) {
            if (!question) {
                res.status(500).send('Cannot find question!');
            } else {
                res.render('question', {question: question});
            }
        });
});

router.post('/:id', function (req, res) {
    models.Question.findById(req.params.id).then(function (question) {
        question.set('question', req.body.question)
            .save()
            .then(function (question) {
                res.redirect('/questions/' + question.id);
            });
    });
});

router.post('/:id/choices/add', function (req, res) {
    models.Choice.create({
        choice: req.body.choice,
        QuestionId: req.params.id
    })

        .then(function () {
            res.redirect('/questions/' + req.params.id);
        });
});

router.post('/:questionId/choices/:choiceId', function (req, res) {
    models.Choice.findById(req.params.choiceId).then(function (choice) {
        choice.set('choice', req.body.choice)
            .save()
            .then(function (choice) {
                res.redirect('/questions/' + req.params.questionId)
            })
    })
});

module.exports = router;