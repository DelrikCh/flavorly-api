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
      foreignKey: 'followeeId',
      as: 'followee',
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
    followeeId: {
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
        fields: ['followerId', 'followeeId'],
      },
    ],
  }
);

export default Follow;
