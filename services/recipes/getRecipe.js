import Recipe from '../../models/Recipe.js';
import Ingredient from '../../models/Ingredient.js';
import User from '../../models/User.js';

const getRecipe = async (id) => {
  return await Recipe.findByPk(id, {
    include: [
      Ingredient,
      {
        model: User,
        as: 'owner',
        attributes: ['name', 'avatar'],
      },
    ],
  });
};

export default getRecipe;
