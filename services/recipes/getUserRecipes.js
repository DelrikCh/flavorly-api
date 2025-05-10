import { literal } from 'sequelize';
import models from '../../models/index.js';

const getUserRecipes = async ({ userId, ownerId, offset, limit }) => {
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

  const result = await models.Recipe.findAndCountAll({
    where: { ownerId },
    attributes,
    include: [models.Ingredient],
    offset,
    limit,
    distinct: true,
  });

  return result;
};

export default getUserRecipes;
