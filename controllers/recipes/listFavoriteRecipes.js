import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import getFavoriteRecipes from '../../services/recipes/getFavoriteRecipes.js';

const listFavoriteRecipes = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const favorites = getFavoriteRecipes({
    ownerId: req.user.id,
    limit: parseInt(limit),
    offset,
  });

  res.json(favorites);
};

export default ctrlWrapper(listFavoriteRecipes);
