import HttpError from '../../helpers/HttpError.js';
import User from '../../models/User.js';

const logoutUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw HttpError(401, 'Not authorized');
  }
  await user.update({ token: null });
  return user;
};

export default logoutUser;
