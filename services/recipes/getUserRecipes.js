import models from '../../models/index.js';

const getUserRecipes = async ({ userId, offset, limit }) => {
  const result = await models.Recipe.findAndCountAll({
    where: { ownerId: userId },
    include: [models.Ingredient],
    offset,
    limit,
  });

  return result;
};

export default getUserRecipes;
