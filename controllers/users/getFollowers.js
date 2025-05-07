import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import HttpError from '../../helpers/HttpError.js';
import getFollowersService from '../../services/users/getFollowers.js';

const getFollowers = async (req, res) => {
  const { id: userId } = req.params;
  if (!userId) {
    throw HttpError(400, 'Missing required field: userId');
  }
  const followers = await getFollowersService(userId);
  const result = followers.map(({ follower }) => {
    return {
      id: follower.id,
      avatar: follower.avatar,
      name: follower.name,
      email: follower.email,
    };
  });
  return res.status(200).json({
    followers: result,
  });
};

export default ctrlWrapper(getFollowers);
