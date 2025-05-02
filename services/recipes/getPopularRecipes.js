import models from '../../models/index.js';

const findPopularRecipes = async ({ limit }) => {
  const result = await models.Recipe.findAll({
    order: [['favoritesCount', 'DESC']],
    limit,
  });

  return result;
};

export default findPopularRecipes;
