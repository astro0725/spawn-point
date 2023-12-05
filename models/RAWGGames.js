module.exports = (sequelize, DataTypes) => {
    const RAWGGame = sequelize.define('RAWGGame', {
        gameId: {
            type: DataTypes.INTEGER, // possibly might use strings as opposed to integers
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        backgroundImageUrl: {
            type: DataTypes.STRING,
            allowNull: true  
        },
    });
    RAWGGame.associate = models => {
        RAWGGame.belongsToMany(models.Showcase, { through: 'ShowcaseGame' });
    };
    return RAWGGame;
};