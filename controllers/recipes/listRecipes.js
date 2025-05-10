import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import getRecipes from '../../services/recipes/getRecipes.js';

const listRecipes = async (req, res) => {
  const { category, ingredient, area, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const result = await getRecipes({
    userId: req.user?.id,
    category,
    ingredient,
    area,
    offset,
    limit: parseInt(limit),
  });

  res.json({
    total: result.count,
    page: +page,
    recipes: result.rows,
  });
};

export default ctrlWrapper(listRecipes);
