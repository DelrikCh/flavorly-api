import HttpError from '../../helpers/HttpError.js';
import models, { sequelize } from '../../models/index.js';
import findRecipe from './findRecipe.js';

const deleteRecipe = async (userId, recipeId) => {
  // Start a transaction
  const transaction = await sequelize.transaction();

  try {
		const recipe = await findRecipe(recipeId);

		if (!recipe || recipe.ownerId !== userId) {
			return res.status(403).json({ message: 'Forbidden' });
		}
	
		await recipe.destroy({ transaction });

		await models.User.decrement('addedRecipes', {
			by: 1,
			where: { id: userId },
			transaction,
		});

    // Commit the transaction
    await transaction.commit();
  } catch (error) {
    console.error('Failed to delete recipe:', error);

    await transaction.rollback();

    if (error instanceof Error) {
      throw error;
    }
    throw HttpError(500, 'Internal server error');
  }
};

export default deleteRecipe;
