const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Adjust the path as needed

class User extends Model {}

User.init(
    {
        firebaseUserId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
        },
        firebaseUserName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;
