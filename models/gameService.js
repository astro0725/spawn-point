// TODO: create db model for game showcase

module.exports = (sequelize, DataTypes) => {
    class Showcase extends sequelize.Sequelize.Model {}
    Showcase.init({
        firebaseUserId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    }, {
        sequelize,
        modelName: 'Showcase',
    });
    return S;
};