import { literal } from 'sequelize';
import models from '../../models/index.js';

const getRecipes = async ({
  userId,
  category,
  ingredient,
  area,
  offset,
  limit,
}) => {
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

  let attributes;
  if (userId) {
    attributes = {
      include: [
        [
          literal(`EXISTS (
            SELECT 1 FROM "favorites"
            WHERE "favorites"."recipeId" = "Recipe"."id"
              AND "favorites"."userId" = '${userId}'
          )`),
          'isFavorite',
        ],
      ],
    };
  }

  return await models.Recipe.findAndCountAll({
    where,
    attributes,
    include,
    offset,
    limit,
    order: [['createdAt', 'DESC']],
    distinct: true,
  });
};

export default getRecipes;
