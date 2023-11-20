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
    await queryInterface.createTable('posts', {
      // Define an 'id' column as an auto-incrementing integer
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      // Define a 'content' column as a text field
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      // Define a 'firebaseUserId' column to store the Firebase user ID
      firebaseUserId: {
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true
      },
      // Timestamps
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('posts');
  }
};
