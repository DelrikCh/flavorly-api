import models from '../../models/index.js';

const findPopularRecipes = async ({ limit }) => {
  return await models.Recipe.findAll({
    order: [['favoritesCount', 'DESC']],
    limit,
    include: [
      {
        model: models.User,
        as: 'owner',
        attributes: ['name', 'avatar'],
      },
    ],
  });
};

export default findPopularRecipes;
