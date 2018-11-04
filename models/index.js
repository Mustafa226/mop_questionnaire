'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var db        = {};

var sequelize = new Sequelize("mopquestionnaire", 'admin', 'nimda', {host:'localhost', dialect: 'mysql'});

sequelize.authenticate().then(function (value) { console.log('success') }).catch(function (reason) { console.log('error') });

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function(file) {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    db[modelName].sync({"force":true});
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
