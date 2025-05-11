import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import deleteRecipeService from '../../services/recipes/deleteRecipe.js';

const deleteRecipe = async (req, res) => {
  await deleteRecipeService(req.user.id, req.params.id);

  res.json({ message: 'Deleted' });
};

export default ctrlWrapper(deleteRecipe);
