import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import HttpError from '../../helpers/HttpError.js';
import followUserService from '../../services/users/followUser.js';

const followUser = async (req, res) => {
  const { id: currentUserId } = req.user;
  const { userId } = req.body;
  if (!userId) {
    throw HttpError(400, 'Missing required field: userId');
  }
  if (currentUserId === userId) {
    throw HttpError(400, 'You cannot follow yourself');
  }
  await followUserService(currentUserId, userId);
  res.status(200).json({
    message: 'You are now following this user',
  });
};

export default ctrlWrapper(followUser);
