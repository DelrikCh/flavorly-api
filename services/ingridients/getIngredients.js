import models from '../../models/index.js';

const getAllIngredients = async () => {
  return await models.Ingredient.findAll({
    order: [['name', 'ASC']],
  });
};

export default getAllIngredients;
