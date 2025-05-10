import User from '../../models/User.js';
import Follow from '../../models/Follow.js';
import Recipe from '../../models/Recipe.js';
import HttpError from '../../helpers/HttpError.js';

const getFollowers = async (userId, page = 1, limit = 5) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw HttpError(404, 'User not found');
  }
  const offset = (page - 1) * limit;
  const total = await Follow.count({ where: { followingId: userId } });
  const followers = await Follow.findAll({
    where: { followingId: userId },
    offset,
    limit,
    include: {
      model: User,
      as: 'follower',
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'token'],
      },
    },
  });
  const enriched = await Promise.all(
    followers.map(async ({ follower }) => {
      const [recipes, recipeCount] = await Promise.all([
        Recipe.findAll({
          where: { ownerId: follower.id },
          order: [['createdAt', 'DESC']],
          limit: 4,
          attributes: ['title', 'thumb'],
        }),
        Recipe.count({ where: { ownerId: follower.id } }),
      ]);
      return {
        id: follower.id,
        name: follower.name,
        email: follower.email,
        avatar: follower.avatar,
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

export default getFollowers;
