import { default as loginUserService } from '../../services/users/loginUser.js';

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await loginUserService({ email, password });
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

export default loginUser;
