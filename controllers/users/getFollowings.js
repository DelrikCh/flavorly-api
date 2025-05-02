import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import getFollowingService from '../../services/users/getFollowings.js';

const getFollowing = async (req, res) => {
  const userId = req.user.id;
  const following = await getFollowingService(userId);
  const result = following.map(({ following }) => {
    return {
      id: following.id,
      avatar: following.avatar,
      name: following.name,
      email: following.email,
    };
  });
  return res.status(200).json({
    following: result,
  });
};

export default ctrlWrapper(getFollowing);
