import bcrypt from 'bcrypt';

import HttpError from '../../helpers/HttpError.js';
import User from '../../models/User.js';
import { generateToken } from '../../helpers/jwt.js';

const loginUser = async (data) => {
  let { email, password } = data;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const token = generateToken({ id: user.id });
  await user.update({ token });
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    token,
  };
};

export default loginUser;
