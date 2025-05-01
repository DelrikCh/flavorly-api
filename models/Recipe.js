import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js';

class Recipe extends Model {
  static associate(models) {
    Recipe.belongsTo(models.User, { as: 'owner', foreignKey: 'ownerId' });
    Recipe.belongsToMany(models.Ingredient, {
      through: models.RecipeIngredient,
      foreignKey: 'recipeId',
      otherKey: 'ingredientId',
    });
  }
}

Recipe.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    ownerId: DataTypes.STRING,
    title: DataTypes.STRING,
    area: DataTypes.STRING,
    category: DataTypes.STRING,
    instructions: DataTypes.TEXT,
    description: DataTypes.TEXT,
    thumb: DataTypes.STRING,
    time: DataTypes.STRING,
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Recipe',
    tableName: 'recipes',
    timestamps: true,
  }
);

export default Recipe;
