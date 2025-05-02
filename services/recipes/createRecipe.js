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

    await models.RecipeIngredient.bulkCreate(recipeIngredientsData, {
      transaction,
    });

    // Commit the transaction
    await transaction.commit();

    const createdRecipe = await getRecipe(recipe.id);

    return createdRecipe;
  } catch (error) {
    console.error('Failed to create recipe:', error);

    await transaction.rollback();

    throw HttpError(500, 'Internal server error');
  }
};

export default createRecipe;
