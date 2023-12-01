// TODO: create db model for game showcase

module.exports = (sequelize, DataTypes) => {
    class Showcase extends sequelize.Sequelize.Model {}
    Showcase.init({
        firebaseUserId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        gameId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        displayOrder: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
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
    };
    
    return Showcase;
};