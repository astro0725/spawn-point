module.exports = (sequelize, DataTypes) => {
    class Follow extends sequelize.Sequelize.Model {}
    Follow.init({
        // do i need to define fields here? ask a TA
    }, {
        sequelize,
        modelName: 'Follow',
        timestamps: true,
    });
    return Follow;
};