'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('users', {
      firebaseUserId: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
      },
      firebaseUserName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
      },
    });

        // add the 'firebaseUserId' column to the 'Posts' table
    await queryInterface.addColumn(
      'Post', // name of the Source model (table)
      'firebaseUserId', // name of the key we're adding 
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Post', 'firebaseUserId');
    await queryInterface.dropTable('users');
  }
};
