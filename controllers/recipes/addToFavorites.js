import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import addUserFavorite from '../../services/recipes/addUserFavorite.js';
import findRecipe from '../../services/recipes/findRecipe.js';

const addToFavorites = async (req, res) => {
  const recipe = await findRecipe(req.params.id);

  if (!recipe) {
    throw HttpError(404, 'Recipe not found');
  }

  await addUserFavorite(req.user.id, req.params.id);

  res.status(200).json({ message: 'Added to favorites' });
};

export default ctrlWrapper(addToFavorites);
