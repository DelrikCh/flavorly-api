import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js';

class User extends Model {
  static associate(_) {
    // Associations are defined in Recipe and Ingredient models
  }
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    addedRecipes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    favoriteRecipes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    followers: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    following: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  }
);

export default User;
