import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import getFavoriteRecipes from '../../services/recipes/getFavoriteRecipes.js';

const listFavoriteRecipes = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const result = await getFavoriteRecipes({
    ownerId: req.user.id,
    limit: parseInt(limit),
    offset,
  });

  res.json({
    total: result.count,
    page: +page,
    favorites: result.rows,
  });
};

export default ctrlWrapper(listFavoriteRecipes);
