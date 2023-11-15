const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Follow extends Model {}

Follow.init(
  {
    followerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    followedId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "follow",
  }
);

module.exports = Follow;
