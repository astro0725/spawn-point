module.exports = (sequelize, DataTypes) => {
    class Posts extends sequelize.Sequelize.Model {}
    Posts.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        sequelize,
        modelName: 'Posts'
    });
    Posts.associate = models => {
        Posts.belongsTo(models.User, { 
            foreignKey: 'firebaseUserId', 
            as: 'user' 
        });
    };
    return Posts;
};