import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import getUserRecipes from '../../services/recipes/getUserRecipes.js';

const listMyRecipes = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const result = await getUserRecipes({
    userId: req.user.id,
    limit: parseInt(limit),
    offset,
  });

  res.json({
    total: result.count,
    page: +page,
    recipes: result.rows,
  });
};

export default ctrlWrapper(listMyRecipes);
