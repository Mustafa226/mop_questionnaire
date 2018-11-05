'use strict';

module.exports = function(sequelize, DataTypes) {
    var Question = sequelize.define('Question', {
        question: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                /*Question.belongsToMany(models.Guest, {
                    through: {
                        model: models.QuestionGuest,
                        unique: false
                    },
                    constraints: false
                });*/
                Question.belongsTo(models.Questionnaire, {
                    onDelete: 'CASCADE',
                    foreignKey: {
                        allowNull: true
                    }
                });
                Question.hasMany(models.Choice);
            }
        }
    });
    return Question;
};