module.exports = (sequelize, DataTypes) => {
    class Post extends sequelize.Sequelize.Model {}
    Post.init({
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
        modelName: 'Post'
    });
    Post.associate = models => {
        Post.belongsTo(models.User, { 
            foreignKey: 'firebaseUserId', 
            as: 'user' 
        });
    };
    return Post;
};