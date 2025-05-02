import models from '../../models/index.js';

const getFavoriteRecipes = async ({ ownerId, limit, offset }) => {
  return await models.Recipe.findAll({
    include: {
      model: models.Favorite,
      where: { userId: ownerId },
      offset,
      limit,
    },
  });
};

export default getFavoriteRecipes;
