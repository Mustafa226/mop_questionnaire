var express = require('express');
var router = express.Router();
var cors = require('cors');
var models = require('../models');
var uuid = require('uuid');
var token;

router.use(cors());

process.env.SECRET_KEY = "mopquestionnaire";

router.get('/signup', function (req, res) {
    res.render('signup');
});

router.post('/signup', function (req, res) {
    var email = req.body.email;
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    var password = req.body.password;
    models.Guest.findOrCreate({
        where: {
            uuid: uuid.v1()
        }
    }).spread(function (guest, created) {
        if (created) {
            guest.set(
                {
                    email: email,
                    first_name: firstName,
                    last_name: lastName,
                    password: password
                }
            ).save();
        }
    })
        .then(function (value) {
            res.redirect('/');
        })
        .catch(function (reason) {
            console.log("There was an error while creating new User")
        });
});

router.post('/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    models.Guest.find({
        where: {
            email: email
        }
    }).then(function (value) {
        if (value.password === password) {
            res.redirect('/home');
        } else {
            res.redirect('/');
        }
    });
});

router.get('/password/reset', function (req, res) {
    res.render('passwordreset')
});

router.post('/password/reset', function (req, res) {
    var email = req.body.email;
    var newPassword = req.body.password;
    models.Guest.find({
        where: {
            email: email
        }
    }).then(function (value) {
            value.set("password", newPassword);
            value.save();
            res.redirect('/');
        })
        .catch(function (reason) {
            console.log("Failed to update password! Error: " + reason)
            res.redirect('/users/password/reset');
        });
});

router.get('/list', function (req, res, next) {
    var appData = {};

    models.sequelize.query('SELECT * FROM Guests', {
        type: models.sequelize.QueryTypes.SELECT
    })
        .then(function (guests) {
            if (guests.length <= 0) {
                appData["error"] = 1;
                appData["data"] = "No data found";
                res.status(204).json(appData);
            } else {
                appData["error"] = 0;
                appData["data"] = guests;
                res.status(200).json(appData);
            }
        });

});

module.exports = router;
