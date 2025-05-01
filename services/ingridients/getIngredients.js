import Ingredient from '../../models/Ingredient.js';

const getAllIngredients = async () => {
  return await Ingredient.findAll();
};

export default getAllIngredients;
