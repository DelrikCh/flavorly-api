import models from '../../models/index.js';

const deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await models.Recipe.findByPk(req.params.id);

    if (!recipe || recipe.ownerId !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await recipe.destroy();

    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
};

export default deleteRecipe;
