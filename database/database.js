var mysql = require("mysql");
var express = require('express');
var router = express.Router();

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'admin',
    password : 'nimda',
    database : 'mopquestionnaire'
});

// connect to DB
connection.connect();

global.db = connection;

module.exports.connection = connection;
