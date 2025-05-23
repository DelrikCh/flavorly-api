import HttpError from '../../helpers/HttpError.js';
import models, { sequelize } from '../../models/index.js';

import getRecipe from './getRecipe.js';

const createRecipe = async (payload) => {
  const {
    ownerId,
    title,
    description,
    instructions,
    thumb,
    time,
    area,
    category,
    ingredients,
  } = payload;

  // Start a transaction
  const transaction = await sequelize.transaction();

  try {
    const recipe = await models.Recipe.create(
      {
        ownerId,
        title,
        description,
        area,
        category,
        instructions,
        thumb,
        time: parseInt(time),
      },
      { transaction }
    );

    const recipeIngredientsData = ingredients.map(({ id, measure }) => ({
      recipeId: recipe.id,
      ingredientId: id,
      measure,
    }));
    const ingredientIds = recipeIngredientsData.map((i) => i.ingredientId);
    const ingredientsInDb = await models.Ingredient.findAll({
      where: {
        id: ingredientIds,
      },
      transaction,
    });
    if (ingredientsInDb.length !== ingredientIds.length) {
      throw HttpError(400, 'Invalid ingredient ID(s)');
    }

    await models.RecipeIngredient.bulkCreate(recipeIngredientsData, {
      transaction,
    });

    await models.User.increment('addedRecipes', {
      by: 1,
      where: { id: ownerId },
      transaction,
    });

    // Commit the transaction
    await transaction.commit();

    const createdRecipe = await getRecipe(recipe.id);

    return createdRecipe;
  } catch (error) {
    console.error('Failed to create recipe:', error);

    await transaction.rollback();

    if (error instanceof Error) {
      throw error;
    }
    throw HttpError(500, 'Internal server error');
  }
};

export default createRecipe;
