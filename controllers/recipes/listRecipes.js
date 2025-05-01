import models from '../../models/index.js';

import getRecipes from '../../services/recipes/getRecipes.js';

const listRecipes = async (req, res, next) => {
  try {
    const { category, ingredient, area, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (category) where.category = category;
    if (area) where.area = area;

    const include = [];
    if (ingredient) {
      include.push({
        model: models.Ingredient,
        where: { id: ingredient },
        through: { attributes: [] },
      });
    }

    const result = await getRecipes({
      where,
      include,
      offset,
      limit: parseInt(limit),
    });

    res.json({
      total: result.count,
      page: +page,
      recipes: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

export default listRecipes;
