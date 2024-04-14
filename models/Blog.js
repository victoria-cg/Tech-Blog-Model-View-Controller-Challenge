const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
   user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User', // Name of the User sequelize model
      key: 'id', // Name of the id column in the user model
    },
  },
},
//model name in this section should be lowercase
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog',
  }
);

module.exports = Blog;
