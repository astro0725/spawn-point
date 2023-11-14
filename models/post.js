module.exports = (sequelize, DataTypes) => {

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

    firebaseUserId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  });
  return Post;
};

module.exports = Post;