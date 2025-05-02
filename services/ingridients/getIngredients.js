import models from '../../models/index.js';

const getAllIngredients = async () => {
  return await models.Ingredient.findAll();
};

export default getAllIngredients;
