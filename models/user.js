const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index'); 

class User extends Model {}

User.init({
    firebaseUserId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
    }, {
    sequelize,
    modelName: 'User'
    });

module.exports = User;
