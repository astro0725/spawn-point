const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); 

class Post extends Model {}

Post.init(
    {
        // Define model attributes
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
        content: {
        type: DataTypes.TEXT,
        allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true, 
        },
        videoUrl: {
            type: DataTypes.STRING,
            allowNull: true, 
        },

        firebaseUserId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        timestamps: true, 
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);

module.exports = Post;
