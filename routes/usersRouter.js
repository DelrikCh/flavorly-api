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
import followUser from '../controllers/users/followUser.js';
import unfollowUser from '../controllers/users/unfollowUser.js';
import getFollowers from '../controllers/users/getFollowers.js';
import getFollowing from '../controllers/users/getFollowings.js';
import updateAvatar from '../controllers/users/updateAvatar.js';

const usersRouter = express.Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, name]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email already in use
 */
usersRouter.post('/register', validateBody(userRegisterSchema), registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login an existing user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *       400:
 *         description: Missing or invalid credentials
 *       401:
 *         description: Invalid credentials
 */
usersRouter.post('/login', validateBody(userLoginSchema), loginUser);

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Logout the current user
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: Unauthorized
 */
usersRouter.post('/logout', authenticate, logoutUser);

/**
 * @swagger
 * /users/current:
 *   get:
 *     summary: Get current user information
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user info
 *       401:
 *         description: Unauthorized
 */
usersRouter.get('/current', authenticate, currentUser);

/**
 * @swagger
 * /users/details:
 *   get:
 *     summary: Get details of a user
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User details returned
 *       400:
 *         description: Missing or invalid userId
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
usersRouter.get('/details', authenticate, userDetails);

usersRouter.patch(
  '/avatar',
  authenticate,
  upload.single('avatar'),
  updateAvatar
);

/**
 * @swagger
 * /users/followers:
 *   get:
 *     summary: Get list of followers for a user
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of followers
 *       400:
 *         description: Missing or invalid userId
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
usersRouter.get('/followers', authenticate, getFollowers);

/**
 * @swagger
 * /users/following:
 *   get:
 *     summary: Get list of users the current user is following
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of followed users
 *       401:
 *         description: Unauthorized
 */
usersRouter.get('/following', authenticate, getFollowing);

/**
 * @swagger
 * /users/{id}/follow:
 *   post:
 *     summary: Follow another user
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to follow
 *     responses:
 *       200:
 *         description: Followed successfully
 *       400:
 *         description: Invalid follow operation
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
usersRouter.post('/:id/follow', authenticate, followUser);

/**
 * @swagger
 * /users/{id}/unfollow:
 *   delete:
 *     summary: Unfollow a user
 *     tags: [Users]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to unfollow
 *     responses:
 *       200:
 *         description: Unfollowed successfully
 *       400:
 *         description: Invalid unfollow operation
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
usersRouter.delete('/:id/unfollow', authenticate, unfollowUser);

export default usersRouter;
