'use strict';

module.exports = function(sequelize, DataTypes) {
    var Guest = sequelize.define('Guest', {
        uuid: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        ipAddress: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Guest.belongsToMany(models.Questionnaire, {
                    through: {
                        model: models.QuestionnaireGuest
                    }
                });
            }
        }
    });
    return Guest;
};