import Recipe from '../../models/Recipe.js';

const findPopularRecipes = async () => {
  const result = await Recipe.findAll({
    order: [['favoritesCount', 'DESC']],
    limit: 10,
  });

  return result;
};

export default findPopularRecipes;
