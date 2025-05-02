import findUser from '../../services/users/findUser.js';
import logoutUserService from '../../services/users/logoutUser.js';

const getFollowers = async (req, res) => {
  const userId = req.query.userId;
  const user = await findUser(userId);
  console.log(user.followers);
  res.status(200).json({
    status: 'success',
  });
};

export default getFollowers;
