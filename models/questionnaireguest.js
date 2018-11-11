'use strict';

module.exports = function(sequelize, DataTypes) {
    var QuestionnaireGuest = sequelize.define('QuestionnaireGuest', {
        GuestId: DataTypes.STRING,
        QuestionnaireId: DataTypes.INTEGER
    },{
        classMethods: {
            associate: function(models) {
                QuestionnaireGuest.belongsTo(models.Choice, {
                    constraints: false,
                    foreignKey: 'ChoiceId'
                });
            }
        }
    });
    return QuestionnaireGuest;
};