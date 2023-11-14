module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Posts', 'firebaseUserId', {
        type: Sequelize.STRING,
        allowNull: false
    });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Posts', 'firebaseUserId');
    }
};
