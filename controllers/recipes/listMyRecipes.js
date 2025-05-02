import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import getUserRecipes from '../../services/recipes/getUserRecipes.js';

const listMyRecipes = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const recipes = await getUserRecipes({
    userId: req.user.id,
    limit: parseInt(limit),
    offset,
  });

  res.json(recipes);
};

export default ctrlWrapper(listMyRecipes);
