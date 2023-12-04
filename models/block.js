module.exports = (sequelize, DataTypes) => {
    const BlockedUser = sequelize.define('BlockedUser', {
        blockerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        blockedId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'BlockedUser'
    });

    return BlockedUser;
};
