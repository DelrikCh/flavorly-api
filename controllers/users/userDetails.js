import findUser from '../../services/users/findUser.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const currentUserFields = [
  'id',
  'avatar',
  'name',
  'email',
  'addedRecipes',
  'favoriteRecipes',
  'followers',
  'following',
];

const anotherUserFields = [
  'id',
  'avatar',
  'name',
  'email',
  'addedRecipes',
  'followers',
];
const fieldAlias = {
  followers: 'followersCount',
  following: 'followingCount',
};

const pickFields = (obj, fields) =>
  fields.reduce((acc, key) => {
    if (key in obj) {
      acc[fieldAlias[key] || key] = obj[key];
    }
    return acc;
  }, {});

const userDetails = async (req, res) => {
  const user = req.user;
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  const userInfo = await findUser({ id: userId });
  if (!userInfo) {
    return res.status(404).json({ message: 'User not found' });
  }
  const isCurrentUser = user.id === userId;
  const filter = isCurrentUser ? currentUserFields : anotherUserFields;
  const filteredUser = pickFields(userInfo, filter);
  return res.status(200).json({
    user: filteredUser,
  });
};

export default ctrlWrapper(userDetails);
