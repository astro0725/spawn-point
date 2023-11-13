const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize'); 

const Post = sequelize.define('Post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  },

  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true, 
  },

  videoUrl: {
    type: Sequelize.STRING,
    allowNull: true, 
  },

  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Users', 
      key: 'id',
    }
  }

});

module.exports = Post;