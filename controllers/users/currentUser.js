import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import getFavoriteRecipes from '../../services/recipes/getFavoriteRecipes.js';

const currentUser = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      favoriteRecipes: (
        await getFavoriteRecipes({
          ownerId: user.id,
          limit: 0,
          offset: 0,
        })
      ).rows.map((recipe) => recipe.id),
    },
  });
};

export default ctrlWrapper(currentUser);
