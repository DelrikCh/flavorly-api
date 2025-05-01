import Recipe from '../../models/Recipe.js';
import Favorite from '../../models/Favorite.js';

const addUserFavorite = async (userId, recipeId) => {
  const deleted = await Favorite.destroy({
    where: {
      userId: userId,
      recipeId: recipeId,
    },
  });

  if (deleted) {
    await Recipe.decrement('favoritesCount', {
      by: 1,
      where: { id: recipeId },
    });
  }

  return;
};

export default addUserFavorite;
