'use strict';

module.exports = function(sequelize, DataTypes) {
    var Choice = sequelize.define('Choice', {
        choice: DataTypes.STRING
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