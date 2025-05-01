import removeUserFavorite from '../../services/recipes/removeUserFavorite.js';

const removeFromFavorites = async (req, res, next) => {
  try {
    await removeUserFavorite(req.user.id, req.params.id);

    res.status(200).json({ message: 'Removed from favorites' });
  } catch (err) {
    next(err);
  }
};

export default removeFromFavorites;
