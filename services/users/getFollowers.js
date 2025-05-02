import User from '../../models/User.js';
import Follow from '../../models/Follow.js';
import HttpError from '../../helpers/HttpError.js';

const getFollowers = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw HttpError(404, 'User not found');
  }
  let followers = await Follow.findAll({
    where: { followeeId: userId },
    include: {
      model: User,
      as: 'follower',
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'token'],
      },
    },
  });
  return followers;
};

export default getFollowers;
