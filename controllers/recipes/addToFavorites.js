import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import addUserFavorite from '../../services/recipes/addUserFavorite.js';

const addToFavorites = async (req, res) => {
  await addUserFavorite(req.user.id, req.params.id);

  res.status(200).json({ message: 'Added to favorites' });
};

export default ctrlWrapper(addToFavorites);
