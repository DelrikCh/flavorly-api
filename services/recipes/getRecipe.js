
import Recipe from '../../models/Recipe.js';
import Ingredient from '../../models/Ingredient.js';

const getRecipe = async (id) => {
  return await Recipe.findByPk(id, {
    include: [Ingredient],
  });
};

export default getRecipe;
