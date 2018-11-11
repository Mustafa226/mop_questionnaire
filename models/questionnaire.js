'use strict';

module.exports = function(sequelize, DataTypes) {
    var Questionnaire = sequelize.define('Questionnaire', {
        questionnaire: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // Questionnaire.hasMany(models.Question, {as : 'Questions'});
                Questionnaire.belongsToMany(models.Question, {through: 'QuestionnaireQuestion'});
            }
        }
    });
    return Questionnaire;
};