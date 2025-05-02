import { Model, DataTypes } from 'sequelize';
import { ObjectId } from 'bson';
import { sequelize } from '../db/index.js';

class User extends Model {
  static associate(models) {
    User.hasMany(models.Follow, {
      foreignKey: 'followerId',
      as: 'followings',
    });
    User.hasMany(models.Follow, {
      foreignKey: 'followingId',
      as: 'followers',
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => new ObjectId().toString(),
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
      allowNull: false,
      defaultValue: 0,
    },
    favoriteRecipes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    followersCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    followingCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: null,
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
