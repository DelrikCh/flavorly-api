import models from '../../models/index.js';

const getUserRecipes = async ({ ownerId, offset, limit }) => {
  const result = await models.Recipe.findAndCountAll({
    where: { ownerId },
    include: [models.Ingredient],
    offset,
    limit,
  });

  return result;
};

export default getUserRecipes;
