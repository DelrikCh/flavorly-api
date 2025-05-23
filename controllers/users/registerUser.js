import registerUserService from '../../services/users/registerUser.js';
import findUser from '../../services/users/findUser.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  // Check if the user already exists
  const existingUser = await findUser({ email }, null);
  if (existingUser) {
    return res.status(409).json({ message: 'Email in use' });
  }
  // Register the new user
  const newUser = await registerUserService({ name, email, password });
  if (!newUser) {
    return res.status(500).json({ message: 'Error registering user' });
  }
  // Send a response
  return res.status(201).json({
    message: 'User registered successfully',
  });
};

export default ctrlWrapper(registerUser);
