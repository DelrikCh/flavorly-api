import Recipe from '../../models/Recipe.js';
import Favorite from '../../models/Favorite.js';

const removeUserFavorite = async (userId, recipeId) => {
  const [_, created] = await Favorite.findOrCreate({
    where: {
      userId: userId,
      recipeId: recipeId,
    },
  });

  if (created) {
    await Recipe.increment('favoritesCount', {
      by: 1,
      where: { id: recipeId },
    });
  }
  return;
};

export default removeUserFavorite;
