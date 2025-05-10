import { literal } from 'sequelize';
import models from '../../models/index.js';

const findPopularRecipes = async ({ userId, limit }) => {
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

  return await models.Recipe.findAll({
    order: [['favoritesCount', 'DESC']],
    limit,
    attributes,
    include: [
      {
        model: models.User,
        as: 'owner',
        attributes: ['name', 'avatar'],
      },
    ],
  });
};

export default findPopularRecipes;
