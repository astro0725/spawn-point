module.exports = (sequelize, DataTypes) => {
  // define a Sequelize model called 'Post'
  const Post = sequelize.define('Post', {
      body: {
          type: DataTypes.TEXT,
          allowNull: false
      },
      imageUrl: {
          type: DataTypes.STRING,
          allowNull: true, 
      },
      videoUrl: {
          type: DataTypes.STRING,
          allowNull: true, 
      },
      firebaseUserId: {
          type: DataTypes.STRING,
          allowNull: false
      },
      createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
      },
  });

  return Post; // return the 'Post' model definition
};