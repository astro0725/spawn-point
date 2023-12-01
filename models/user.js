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
        User.hasMany(models.Posts, { through: 'UserPosts' });
        User.hasOne(models.Showcase, { through: 'UserShowcase' });
    };
    return User;
};