module.exports = (sequelize, DataTypes) => {
    class User extends sequelize.Sequelize.Model {}
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
        },
        biography: {
            type: DataTypes.STRING,
            unique: true
        },
        profilePicture: {
            type: DataTypes.STRING,
            unique: true
        },
        profileHeader: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'User',
        timestamps: true,
    });
    User.associate = models => {
        User.belongsToMany(models.Showcase, { through: 'UserShowcase' });
    };
    User.associate = models => {
        User.belongsToMany(models.Posts, { through: 'UserPosts' });
    };
    return User;
};