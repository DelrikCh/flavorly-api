import HttpError from '../../helpers/HttpError.js';
import User from '../../models/User.js';

const userDetails = async (id) => {
  try {
    const user = await User.findById(id).select('-password -__v');
    return user;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw HttpError(500, 'Error fetching user details');
  }
};

export default userDetails;
