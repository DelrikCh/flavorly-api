import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import HttpError from '../../helpers/HttpError.js';
import getFollowersService from '../../services/users/getFollowers.js';

const getFollowers = async (req, res) => {
  const { id: userId } = req.params;
  const { page = 1, limit = 5 } = req.query;
  if (!userId) {
    throw HttpError(400, 'Missing required field: userId');
  }
  const followers = await getFollowersService(
    userId,
    Number(page),
    Number(limit),
    req.user.id
  );
  return res.status(200).json({ followers: followers });
};

export default ctrlWrapper(getFollowers);
