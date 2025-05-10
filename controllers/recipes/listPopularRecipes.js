import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import getPopularRecipes from '../../services/recipes/getPopularRecipes.js';

const DEFAULT_POPULAR_LIIMIT = 4;

const listPopularRecipes = async (req, res) => {
  const { limit = DEFAULT_POPULAR_LIIMIT } = req.query;

  const recipes = await getPopularRecipes({
    userId: req.user?.id,
    limit: parseInt(limit),
  });

  res.json(recipes);
};

export default ctrlWrapper(listPopularRecipes);
