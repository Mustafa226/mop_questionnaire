'use strict';

module.exports = function(sequelize, DataTypes) {
    var QuestionnaireQuestion = sequelize.define('QuestionnaireQuestion', {
        QuestionId: DataTypes.STRING,
        QuestionnaireId: DataTypes.INTEGER
    },{
        classMethods: {
            associate: function(models) {}
        }
    });
    return QuestionnaireQuestion;
};