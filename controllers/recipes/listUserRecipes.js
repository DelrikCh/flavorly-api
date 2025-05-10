import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import getUserRecipes from '../../services/recipes/getUserRecipes.js';

const listUserRecipes = async (req, res) => {
  const { id: userId } = req.params;
  const ownerId = userId ?? req.user.id;
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const result = await getUserRecipes({
    ownerId,
    limit: parseInt(limit),
    offset,
  });

  res.json({
    total: result.count,
    page: +page,
    recipes: result.rows,
  });
};

export default ctrlWrapper(listUserRecipes);
