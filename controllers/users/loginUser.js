import loginUserService from '../../services/users/loginUser.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const result = await loginUserService({ email, password });
  return res.status(200).json({
    result,
  });
};

export default ctrlWrapper(loginUser);
