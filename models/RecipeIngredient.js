import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js';

class RecipeIngredient extends Model {
  static associate(_models) {
    // Associations are defined in Recipe and Ingredient models
  }
}

RecipeIngredient.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    recipeId: {
      type: DataTypes.STRING,
      references: {
        model: 'recipes',
        key: 'id',
      },
    },
    ingredientId: {
      type: DataTypes.STRING,
      references: {
        model: 'ingredients',
        key: 'id',
      },
    },
    measure: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'RecipeIngredient',
    tableName: 'recipe_ingredients',
  }
);

export default RecipeIngredient;
