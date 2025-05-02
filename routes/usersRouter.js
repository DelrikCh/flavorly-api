import express from 'express';

// Helper functions
import validateBody from '../helpers/validateBody.js';
import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';

// Schemas
import userRegisterSchema from '../schemas/users/userRegisterSchema.js';
import userLoginSchema from '../schemas/users/userLoginSchema.js';

// Controller functions
import registerUser from '../controllers/users/registerUser.js';
import loginUser from '../controllers/users/loginUser.js';
import currentUser from '../controllers/users/currentUser.js';
import userDetails from '../controllers/users/userDetails.js';
import logoutUser from '../controllers/users/logoutUser.js';
import updateAvatar from '../controllers/users/updateAvatar.js';

const usersRouter = express.Router();

usersRouter.post('/register', validateBody(userRegisterSchema), registerUser);
usersRouter.post('/login', validateBody(userLoginSchema), loginUser);
usersRouter.get('/current', authenticate, currentUser);
usersRouter.get('/details', authenticate, userDetails);
usersRouter.patch(
  '/avatar',
  authenticate,
  upload.single('avatar'),
  updateAvatar
);
// usersRouter.get('/followers', getFollowers);
// usersRouter.get('/following', getFollowing);
// usersRouter.post('/follow', followUser);
// usersRouter.delete('/unfollow', unfollowUser);
usersRouter.post('/logout', authenticate, logoutUser);

export default usersRouter;
