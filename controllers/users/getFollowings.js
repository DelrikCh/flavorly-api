import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import getFollowingService from '../../services/users/getFollowings.js';

const getFollowing = async (req, res) => {
  const userId = req.user.id;
  const { page = 1, limit = 5 } = req.query;
  const following = await getFollowingService(
    userId,
    Number(page),
    Number(limit)
  );
  return res.status(200).json({ following: following });
};

export default ctrlWrapper(getFollowing);
