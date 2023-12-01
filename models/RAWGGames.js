module.exports = (sequelize, DataTypes) => {
    const RAWGGame = sequelize.define('RAWGGame', {
        title: DataTypes.STRING,
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