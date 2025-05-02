import models from '../../models/index.js';

const getFavoriteRecipes = async ({ ownerId, limit, offset }) => {
  const { count, rows } = await models.Favorite.findAndCountAll({
    where: { userId: ownerId },
    include: [
      {
        model: models.Recipe,
        as: 'recipe',
        attributes: [], 
      },
    ],
    limit,
    offset,
  });

  const recipes = rows
    .map(fav => fav.recipe)
    .filter(Boolean);

  return {
    count,
    recipes,
  };
};

export default getFavoriteRecipes;
