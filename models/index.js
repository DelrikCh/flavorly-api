import { sequelize } from '../db/index.js';
import Area from './Area.js';
import Category from './Category.js';
import Ingredient from './Ingredient.js';
import Recipe from './Recipe.js';
import RecipeIngredient from './RecipeIngredient.js';
import User from './User.js';

const models = {
  Area,
  Category,
  Ingredient,
  Recipe,
  RecipeIngredient,
  User,
};

// Initialize associations
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { sequelize };
export default models;
