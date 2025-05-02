import { Model, DataTypes } from 'sequelize';
import { ObjectId } from 'bson';
import { sequelize } from '../db/index.js';

class Follow extends Model {
  static associate(models) {
    Follow.belongsTo(models.User, {
      foreignKey: 'followerId',
      as: 'follower',
    });
    Follow.belongsTo(models.User, {
      foreignKey: 'followingId',
      as: 'following',
    });
  }
}

Follow.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => new ObjectId().toString(),
    },
    followerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    followingId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Follow',
    tableName: 'follows',
    indexes: [
      {
        unique: true,
        fields: ['followerId', 'followingId'],
      },
    ],
  }
);

export default Follow;
