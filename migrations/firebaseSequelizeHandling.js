module.exports = {
    // define changes to be applied when migrating the database forward
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Posts', 'firebaseUserId', {
            // define the 'firebaseUserId' column with type 'STRING' and disallowing null values
        type: Sequelize.STRING,
        allowNull: false
    });
    },
    // define changes to be applied when rolling back the migration (e.g., removing a column)
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Posts', 'firebaseUserId');
    }
};
