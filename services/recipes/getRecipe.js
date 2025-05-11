import { literal } from 'sequelize';
import Recipe from '../../models/Recipe.js';
import Ingredient from '../../models/Ingredient.js';
import User from '../../models/User.js';

const getRecipe = async (id, userId) => {
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

  return await Recipe.findByPk(id, {
    attributes,
    include: [
      Ingredient,
      {
        model: User,
        as: 'owner',
        attributes: ['name', 'avatar'],
      },
    ],
  });
};

export default getRecipe;
