import models from '../../models/index.js';

const createRecipe = async (req, res, next) => {
  try {
    const newRecipe = await models.Recipe.create({
      ...req.body,
      ownerId: req.user.id,
    });

    res.status(201).json(newRecipe);
  } catch (err) {
    next(err);
  }
};

export default createRecipe;
