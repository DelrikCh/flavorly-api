import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import HttpError from '../../helpers/HttpError.js';
import unfollowUserService from '../../services/users/unfollowUser.js';

const unfollowUser = async (req, res) => {
  const { id: currentUserId } = req.user;
  const { userId } = req.body;
  if (!userId) {
    throw HttpError(400, 'Missing required field: userId');
  }
  if (currentUserId === userId) {
    throw HttpError(400, "You can't unfollow yourself");
  }
  await unfollowUserService(currentUserId, userId);
  res.status(200).json({
    message: 'You are not following this user anymore',
  });
};

export default ctrlWrapper(unfollowUser);
