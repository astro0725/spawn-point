module.exports = (sequelize, DataTypes) => {
    const Connections = sequelize.define('Connections', {
        // todo: setup other platforms
        firebaseUserId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        steamId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    Connections.associate = models => {
        Connections.belongsTo(models.User, {
            foreignKey: 'firebaseUserId',
            as: 'user'
        });
    };

    return Connections;
};
