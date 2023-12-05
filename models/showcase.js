module.exports = (sequelize, DataTypes) => {
    class Showcase extends sequelize.Sequelize.Model {}
    Showcase.init({
        // Maybe allow the showcase name to be configurable?
    }, {
        sequelize,
        modelName: 'Showcase',
        timestamps: true,
    });

    Showcase.associate = models => {
        Showcase.belongsTo(models.User, { 
            foreignKey: 'firebaseUserId',
            as: 'user'
        });
        Showcase.belongsToMany(models.RAWGGame, { through: 'ShowcaseGame' });
    };
    
    return Showcase;
};