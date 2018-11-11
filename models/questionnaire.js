'use strict';

module.exports = function(sequelize, DataTypes) {
    var Questionnaire = sequelize.define('Questionnaire', {
        questionnaire: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Questionnaire.belongsToMany(models.Guest, {
                    through: {
                        model: models.QuestionnaireGuest,
                        unique: false
                    },
                    constraints: false
                });
                Questionnaire.belongsToMany(models.Question, {through: 'QuestionnaireQuestion'});
            }
        }
    });
    return Questionnaire;
};