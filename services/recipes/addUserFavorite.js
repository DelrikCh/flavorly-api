import HttpError from '../../helpers/HttpError.js';
import models, { sequelize } from '../../models/index.js';

const addUserFavorite = async (userId, recipeId) => {
  // Start a transaction
  const transaction = await sequelize.transaction();

  try {
    const [_, created] = await models.Favorite.findOrCreate({
      where: {
        userId: userId,
        recipeId: recipeId,
      },
      transaction,
    });

    if (created) {
      await models.Recipe.increment('favoritesCount', {
        by: 1,
        where: { id: recipeId },
        transaction,
      });
    }

    // Commit the transaction
    await transaction.commit();
  } catch (error) {
    console.error('Failed to add favorite:', error);

    await transaction.rollback();

    throw HttpError(500, 'Internal server error');
  }
};

export default addUserFavorite;
