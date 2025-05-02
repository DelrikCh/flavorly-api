import User from '../../models/User.js';
import Follow from '../../models/Follow.js';
import HttpError from '../../helpers/HttpError.js';
import { sequelize } from '../../db/index.js';

const unfollowUser = async (currentUserId, userId) => {
  // Check if the user to be followed exists
  const userToUnfollow = await User.findByPk(userId);
  if (!userToUnfollow) {
    throw HttpError(404, 'User not found');
  }
  // Check if the user is already following the target user
  const existingFollow = await Follow.findOne({
    where: {
      followerId: currentUserId,
      followingId: userId,
    },
  });
  if (!existingFollow) {
    throw HttpError(400, 'You are not following this user');
  }

  // Start a transaction
  const transaction = await sequelize.transaction();
  try {
    // Delete the follow relationship
    await Follow.destroy({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
      transaction,
    });

    // Update the followers count for both users
    await User.decrement('followersCount', {
      by: 1,
      where: { id: userId },
      transaction,
    });
    await User.decrement('followingCount', {
      by: 1,
      where: { id: currentUserId },
      transaction,
    });

    // Commit the transaction
    await transaction.commit();
  } catch (error) {
    console.error('Error unfollowing user:', error);
    await transaction.rollback();
    throw HttpError(500, 'Internal server error');
  }
};

export default unfollowUser;
