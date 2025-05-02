import models from '../../models/index.js';

const getRecipes = async ({ category, ingredient, area, offset, limit }) => {
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

  const result = await models.Recipe.findAndCountAll({
    where,
    include,
    offset,
    limit,
  });

  return result;
};

export default getRecipes;
