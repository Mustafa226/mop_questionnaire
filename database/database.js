var mysql = require("mysql");
var express = require('express');
var router = express.Router();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'nimda',
    database: 'mopquestionnaire'
});

// connect to DB
connection.connect();

var currentDate = new Date();
var registrationFormData = {
    "first_name": "Admin",
    "last_name": "Admin",
    "email": "Admin",
    "password": "Password",
    "created": currentDate
};

connection.query("INSERT INTO users SET ?", registrationFormData, function (error, rows, fields) {
    if (!error) {
        console.log("Admin user has been created!");
    } else {
        console.log("Could not create admin user!");
    }
});

module.exports.connection = connection;
