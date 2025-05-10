import User from '../../models/User.js';
import Follow from '../../models/Follow.js';
import Recipe from '../../models/Recipe.js';
import HttpError from '../../helpers/HttpError.js';

const getFollowings = async (userId, page = 1, limit = 5) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw HttpError(404, 'User not found');
  }
  const offset = (page - 1) * limit;
  const total = await Follow.count({ where: { followerId: userId } });
  const followings = await Follow.findAll({
    where: { followerId: userId },
    offset,
    limit,
    include: {
      model: User,
      as: 'following',
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'token'],
      },
    },
  });

  const enriched = await Promise.all(
    followings.map(async ({ following }) => {
      const [recipes, recipeCount] = await Promise.all([
        Recipe.findAll({
          where: { ownerId: following.id },
          order: [['createdAt', 'DESC']],
          limit: 4,
          attributes: ['title', 'thumb'],
        }),
        Recipe.count({ where: { ownerId: following.id } }),
      ]);

      return {
        id: following.id,
        name: following.name,
        email: following.email,
        avatar: following.avatar,
        addedRecipesCounter: recipeCount,
        recipesArray: recipes.map((r) => ({ title: r.title, thumb: r.thumb })),
      };
    })
  );

  return {
    items: enriched,
    total,
    page,
    limit,
  };
};

export default getFollowings;
