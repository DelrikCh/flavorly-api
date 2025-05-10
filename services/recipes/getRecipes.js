import models from '../../models/index.js';

const getRecipes = async ({ category, ingredient, area, offset, limit }) => {
  const where = {};
  if (category) where.category = category;
  if (area) where.area = area;

  const include = [
    {
      model: models.User,
      as: 'owner',
      attributes: ['name', 'avatar'],
    },
  ];

  if (ingredient) {
    include.push({
      model: models.Ingredient,
      where: { id: ingredient },
      through: { attributes: [] },
    });
  }

  return await models.Recipe.findAndCountAll({
    where,
    include,
    offset,
    limit,
    order: [['createdAt', 'DESC']],
    distinct: true,
  });
};

export default getRecipes;
