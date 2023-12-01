module.exports = (sequelize, DataTypes) => {
    const RAWGGame = sequelize.define('RAWGGame', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        backgroundImageUrl: {
            type: DataTypes.STRING,
            allowNull: true  
        },
    });
        RAWGGame.associate = models => {
        RAWGGame.belongsToMany(models.User, { through: models.Showcase });
        };
    return RAWGGame;
};