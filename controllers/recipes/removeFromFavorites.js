import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import removeUserFavorite from '../../services/recipes/removeUserFavorite.js';

const removeFromFavorites = async (req, res) => {
  await removeUserFavorite(req.user.id, req.params.id);

  res.status(200).json({ message: 'Removed from favorites' });
};

export default ctrlWrapper(removeFromFavorites);
