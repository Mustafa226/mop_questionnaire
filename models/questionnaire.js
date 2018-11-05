'use strict';

module.exports = function(sequelize, DataTypes) {
    var Questionnaire = sequelize.define('Questionnaire', {
        questionnaire: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Questionnaire.hasMany(models.Question);
            }
        }
    });
    return Questionnaire;
};