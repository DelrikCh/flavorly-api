import HttpError from '../../helpers/HttpError.js';
import User from '../../models/User.js';

const userDetails = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw HttpError(500, 'Error fetching user details');
  }
};

export default userDetails;
