'use strict';

module.exports = function(sequelize, DataTypes) {
    var Choice = sequelize.define('Choice', {
        type: DataTypes.STRING,
        value: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Choice.belongsTo(models.Question, {
                    onDelete: 'CASCADE',
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });

    return Choice;
};