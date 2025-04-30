import seed from './seedBase.js';
import User from '../models/User.js';

seed(
  'data/users.json',
  (user) => ({
    id: user._id.$oid,
    name: user.name,
    email: user.email,
    password: 'DummyPassword',
    avatar: user.avatar,
    addedRecipes: 0,
    favoriteRecipes: 0,
    followers: user.followers.length,
    following: user.following.length,
  }),
  User
);
