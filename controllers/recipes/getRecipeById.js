import getRecipe from '../../services/recipes/getRecipe.js';

const getRecipeById = async (req, res, next) => {
  try {
    const recipe = await getRecipe(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(recipe);
  } catch (err) {
    next(err);
  }
};

export default getRecipeById;
