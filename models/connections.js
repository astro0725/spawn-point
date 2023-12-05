module.exports = (sequelize, DataTypes) => {
    const Connections = sequelize.define('Connections', {
        twitchUserId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        twitchAccessToken: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // todo: setup other platforms
    });

    Connections.associate = models => {
        Connections.belongsTo(models.User, {
            foreignKey: 'firebaseUserId',
            as: 'user'
        });
    };

    return Connections;
};
