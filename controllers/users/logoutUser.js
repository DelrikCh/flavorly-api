import logoutUserService from '../../services/users/logoutUser.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const logoutUser = async (req, res) => {
  const user = req.user;

  await logoutUserService(user.id);
  return res.status(200).json({
    message: 'You are logged out',
  });
};

export default ctrlWrapper(logoutUser);
