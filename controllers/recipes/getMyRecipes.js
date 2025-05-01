import models from '../../models/index.js';

const getMyRecipes = async (req, res, next) => {
  try {
    const recipes = await models.Recipe.findAll({
      where: { ownerId: req.user.id },
    });

    res.json(recipes);
  } catch (err) {
    next(err);
  }
};

export default getMyRecipes;
