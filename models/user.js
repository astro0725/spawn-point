module.exports = (sequelize, DataTypes) => {
    class User extends sequelize.Sequelize.Model {}
    User.init({
        firebaseUserId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        previousPasswordHash: {
            type: DataTypes.STRING, 
            allowNull: true
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
        User.hasMany(models.Posts, {
            foreignKey: 'firebaseUserId',
            as: 'posts'
        });
        User.hasOne(models.Showcase);
        User.belongsToMany(models.User, { 
            as: 'Followers', 
            through: 'Follow',
            foreignKey: 'followingId',
            otherKey: 'followerId'
        });
        User.belongsToMany(models.User, { 
            as: 'Following', 
            through: 'Follow',
            foreignKey: 'followerId',
            otherKey: 'followingId'
        });
        User.hasMany(models.BlockedUser, { foreignKey: 'blockerId' });
        User.hasMany(models.BlockedUser, { foreignKey: 'blockedId' });
    };
    return User;
};