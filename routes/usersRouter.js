import express from 'express';

// Helper functions
import validateBody from '../helpers/validateBody.js';
import authenticate from '../middlewares/authenticate.js';

// Schemas
import userRegisterSchema from '../schemas/users/userRegisterSchema.js';
import userLoginSchema from '../schemas/users/userLoginSchema.js';

// Controller functions
import registerUser from '../controllers/users/registerUser.js';
import loginUser from '../controllers/users/loginUser.js';

const usersRouter = express.Router();

usersRouter.post('/register', validateBody(userRegisterSchema), registerUser);
usersRouter.post('/login', validateBody(userLoginSchema), loginUser);
// usersRouter.get('/current', currentUser);
// usersRouter.get('/details', userDetails);
// usersRouter.patch('/avatar', updateAvatar);
// usersRouter.get('/followers', getFollowers);
// usersRouter.get('/following', getFollowing);
// usersRouter.post('/follow', followUser);
// usersRouter.delete('/unfollow', unfollowUser);
// usersRouter.post('/logout', logoutUser);

export default usersRouter;
