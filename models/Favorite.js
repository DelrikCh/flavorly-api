import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js';

class Favorite extends Model {
  static associate(models) {
    Favorite.belongsTo(models.User, { foreignKey: 'userId' });
    Favorite.belongsTo(models.Recipe, { foreignKey: 'recipeId' });
  }
}

Favorite.init(
  {
    id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
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
