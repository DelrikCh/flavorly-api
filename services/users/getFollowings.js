import User from '../../models/User.js';
import Follow from '../../models/Follow.js';
import HttpError from '../../helpers/HttpError.js';

const getFollowings = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw HttpError(404, 'User not found');
  }
  let followings = await Follow.findAll({
    where: { followerId: userId },
    include: {
      model: User,
      as: 'following',
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'token'],
      },
    },
  });
  return followings;
};

export default getFollowings;
