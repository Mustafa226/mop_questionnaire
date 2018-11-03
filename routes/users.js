var database = require('../database/database');
var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
var cors = require('cors');
var token;

router.use(cors());

process.env.SECRET_KEY = "mopquestionnaire";

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/signup', function (req, res) {

    var appData = {
        "error": 1,
        "data": ''
    };

    var currentDate = new Date();

    var registrationFormData = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "password": req.body.password,
        "created": currentDate
    };

    db.query("INSERT INTO users SET ?", registrationFormData, function (error, rows, fields) {
        if (!error) {
            appData["error"] = 0;
            appData["data"] = "User is registered sucesssfully!";
            res.status(201).json(appData);
        } else {
            appData["error"] = 1;
            appData["data"] = "There was an error while trying to SET new user to the DB!";
            res.status(400).json(appData);
        }
    });

});

router.post('/login', function (req, res) {
    var appData = {};
    var email = req.body.email;
    var password = req.body.password;
    db.query("SELECT * FROM users WHERE email = ?", [email], function (error, rows, fields) {
        if (error) {
            appData["error"] = 1;
            appData["data"] = "There was an error while fetching users!";
            res.status(400).json(appData);
        } else {
            if (rows.length > 0) {
                if (rows[0].password == password) {
                    token = jwt.sign(rows[0], process.env.SECRET_KEY, {expiresIn: 5000});
                    appData["error"] = 0;
                    appData["token"] = token;
                    res.status(200).json(appData);
                } else {
                    appData["error"] = 1;
                    appData["data"] = "Email and Passowrd do not match!";
                    res.status(204).json(appData);
                }
            } else {
                appData["error"] = 1;
                appData["data"] = "Email does not exist!";
                res.status(204).json(appData);
            }
        }
    });
});

router.get('/list', function (req, res, next) {
    var appData = {};

    db.query("SELECT * FROM users", function (error, row, fields) {
        if (error) {
            appData["error"] = 1;
            appData["data"] = "No data found";
            res.status(204).json(appData);
        } else {
            appData["error"] = 0;
            appData["data"] = row;
            res.status(200).json(appData);
        }
    });

});

router.use(function (req, res, next) {
    var token = req.body.token || req.headers['token'];
    var appData = "";
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, function (error) {
            if (error) {
                appData["error"] = 1;
                appData["data"] = "Token is invalid!";
                res.status(500).json(appData);
            } else {
                next();
            }
        });
    } else {
        appData["error"] = 1;
        appData["data"] = "Please send a token!";
        res.status(403).json(appData);
    }
});

module.exports = router;
