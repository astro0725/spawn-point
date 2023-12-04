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
    }, {
        sequelize,
        modelName: 'Posts',
        timestamps: true
    });
    Posts.associate = models => {
        Posts.belongsTo(models.User, { 
            foreignKey: 'firebaseUserId', 
            as: 'user' 
        });
    };
    return Posts;
};