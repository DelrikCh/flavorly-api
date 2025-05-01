import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js';

class Ingredient extends Model {
  static associate(models) {
    Ingredient.belongsToMany(models.Recipe, {
      through: models.RecipeIngredient,
      foreignKey: 'ingredientId',
      otherKey: 'recipeId',
    });
  }
}

Ingredient.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    img: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'Ingredient',
    tableName: 'ingredients',
    timestamps: false,
  }
);

export default Ingredient;
