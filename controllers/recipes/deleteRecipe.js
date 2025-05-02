import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import findRecipe from '../../services/recipes/findRecipe.js';

const deleteRecipe = async (req, res) => {
  const recipe = await findRecipe(req.params.id);

  if (!recipe || recipe.ownerId !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  await recipe.destroy();

  res.json({ message: 'Deleted' });
};

export default ctrlWrapper(deleteRecipe);
