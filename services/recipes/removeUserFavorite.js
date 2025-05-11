import HttpError from '../../helpers/HttpError.js';
import models, { sequelize } from '../../models/index.js';

const removeUserFavorite = async (userId, recipeId) => {
  // Start a transaction
  const transaction = await sequelize.transaction();

  try {
    const deleted = await models.Favorite.destroy({
      where: {
        userId: userId,
        recipeId: recipeId,
      },
      transaction,
    });

    if (deleted) {
      await models.Recipe.decrement('favoritesCount', {
        by: 1,
        where: { id: recipeId },
        transaction,
      });

      await models.User.decrement('favoriteRecipes', {
        by: 1,
        where: { id: userId },
        transaction,
      });
    }

    // Commit the transaction
    await transaction.commit();
  } catch (error) {
    console.error('Failed to remove from favorite:', error);

    await transaction.rollback();

    throw HttpError(500, 'Internal server error');
  }
};

export default removeUserFavorite;
