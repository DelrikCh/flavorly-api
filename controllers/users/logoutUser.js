import logoutUserService from '../../services/users/logoutUser.js';

const logoutUser = async (req, res) => {
  const user = req.user;
  try {
    await logoutUserService(user.id);
    return res.status(200).json({
      message: 'You are logged out',
    });
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

export default logoutUser;
