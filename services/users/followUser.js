import User from '../../models/User.js';
import Follow from '../../models/Follow.js';
import HttpError from '../../helpers/HttpError.js';
import { sequelize } from '../../db/index.js';

const followUser = async (currentUserId, userId) => {
  // Check if the user to be followed exists
  const userToFollow = await User.findByPk(userId);
  if (!userToFollow) {
    throw new HttpError(404, 'User not found');
  }
  // Check if the user is already following the target user
  const existingFollow = await Follow.findOne({
    where: {
      followerId: currentUserId,
      followeeId: userId,
    },
  });
  if (existingFollow) {
    throw new HttpError(400, 'You are already following this user');
  }

  // Start a transaction
  const transaction = await sequelize.transaction();
  try {
    // Create a new follow relationship
    const { follow, created } = await Follow.create(
      {
        followerId: currentUserId,
        followeeId: userId,
      },
      { transaction }
    );
    console.log('Follow relationship created:', follow);
    console.log('Created:', created);
    if (!created) {
      throw new HttpError(500, 'Failed to follow the user');
    }

    // Update the followers count for both users
    await User.increment('followersCount', {
      by: 1,
      where: { id: userId },
      transaction,
    });
    await User.increment('followingCount', {
      by: 1,
      where: { id: currentUserId },
      transaction,
    });

    // Commit the transaction
    await transaction.commit();
    return follow;
  } catch (error) {
    console.error('Error following user:', error);
    await transaction.rollback();
    throw error;
  }
};

export default followUser;
