import models from '../../models/index.js';

const getFavoriteRecipes = async (req, res, next) => {
  try {
    const favorites = await models.Recipe.findAll({
      include: {
        model: models.Favorite,
        where: { userId: req.user.id },
      },
    });

    res.json(favorites);
  } catch (err) {
    next(err);
  }
};

export default getFavoriteRecipes;
