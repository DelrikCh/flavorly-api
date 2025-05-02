import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js';

class Favorite extends Model {
  static associate(models) {
    Favorite.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Favorite.belongsTo(models.Recipe, { foreignKey: 'recipeId', as: 'recipe' });
  }
}

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Favorite',
    tableName: 'favorites',
    indexes: [
      {
        unique: true,
        fields: ['userId', 'recipeId'],
      },
    ],
  }
);

export default Favorite;
