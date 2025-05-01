import bcrypt from 'bcrypt';

import HttpError from '../../helpers/HttpError.js';
import User from '../../models/User.js';

const registerUser = async (data) => {
  let { name, email, password } = data;
  password = bcrypt.hashSync(password, 10);
  const newUser = new User({
    name,
    email,
    password,
  });
  try {
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    console.error('Error registering user:', error);
    throw new HttpError(500, 'Error registering user');
  }
};

export default registerUser;
