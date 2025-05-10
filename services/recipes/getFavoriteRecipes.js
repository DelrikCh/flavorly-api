import models from '../../models/index.js';

const getFavoriteRecipes = async ({ ownerId, limit, offset }) => {
  const { count, rows } = await models.Favorite.findAndCountAll({
    where: { userId: ownerId },
    include: [
      {
        model: models.Recipe,
        as: 'recipe',
      },
    ],
    limit: limit === 0 ? undefined : limit,
    offset,
    distinct: true,
  });

  const recipes = rows.map((fav) => fav.recipe).filter(Boolean);

  return {
    count,
    rows: recipes,
  };
};

export default getFavoriteRecipes;
