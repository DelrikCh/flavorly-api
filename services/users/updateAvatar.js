import HttpError from '../../helpers/HttpError.js';
import User from '../../models/User.js';

const updateAvatar = async (id, avatarPath) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw HttpError(401, 'Not authorized');
  }
  const updatedUser = await user.update({ avatar: avatarPath });
  return updatedUser;
};

export default updateAvatar;
