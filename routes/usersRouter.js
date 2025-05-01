import express from 'express';

// Helper functions
import validateBody from '../helpers/validateBody.js';

// Schemas
import userRegisterSchema from '../schemas/users/userRegisterSchema.js';

// Controller functions
import registerUser from '../controllers/users/registerUser.js';

const usersRouter = express.Router();

usersRouter.post('/register', validateBody(userRegisterSchema), registerUser);
// usersRouter.post('/login', loginUser);
// usersRouter.get('/current', currentUser);
// usersRouter.get('/details', userDetails);
// usersRouter.patch('/avatar', updateAvatar);
// usersRouter.get('/followers', getFollowers);
// usersRouter.get('/following', getFollowing);
// usersRouter.post('/follow', followUser);
// usersRouter.delete('/unfollow', unfollowUser);
// usersRouter.post('/logout', logoutUser);

export default usersRouter;
