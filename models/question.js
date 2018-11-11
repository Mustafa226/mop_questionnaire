'use strict';

module.exports = function(sequelize, DataTypes) {
    var Question = sequelize.define('Question', {
        question: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Question.belongsToMany(models.Questionnaire, {through: 'QuestionnaireQuestion'});
                Question.hasMany(models.Choice);
            }
        }
    });
    return Question;
};