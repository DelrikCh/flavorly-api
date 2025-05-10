import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import getRecipe from '../../services/recipes/getRecipe.js';

const getRecipeById = async (req, res) => {
  const recipe = await getRecipe(req.params.id, req.user?.id);

  if (!recipe) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.json(recipe);
};

export default ctrlWrapper(getRecipeById);
