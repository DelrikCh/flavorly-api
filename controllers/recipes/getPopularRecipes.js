import findPopularRecipes from '../../services/recipes/findPopularRecipes.js';

const getPopularRecipes = async (_req, res, next) => {
  try {
    const recipes = await findPopularRecipes();

    res.json(recipes);
  } catch (err) {
    next(err);
  }
};

export default getPopularRecipes;
