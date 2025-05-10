import express from 'express';
import attachUserIfExists from '../middlewares/attachUserIfExists.js';
import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';

import listRecipes from '../controllers/recipes/listRecipes.js';
import getRecipeById from '../controllers/recipes/getRecipeById.js';
import listPopularRecipes from '../controllers/recipes/listPopularRecipes.js';

import createRecipe from '../controllers/recipes/createRecipe.js';
import deleteRecipe from '../controllers/recipes/deleteRecipe.js';
import listUserRecipes from '../controllers/recipes/listUserRecipes.js';

import addToFavorites from '../controllers/recipes/addToFavorites.js';
import removeFromFavorites from '../controllers/recipes/removeFromFavorites.js';
import listFavoriteRecipes from '../controllers/recipes/listFavoriteRecipes.js';

import validateBody from '../helpers/validateBody.js';
import recipeSchema from '../schemas/recipes/createRecipeSchema.js';
import parseCreateRecipeInputForm from '../helpers/parseIngredientsJson.js';

const recipesRouter = express.Router();

recipesRouter.get('/', attachUserIfExists, listRecipes);
recipesRouter.get('/popular', attachUserIfExists, listPopularRecipes);

recipesRouter.get('/user/:id?', authenticate, listUserRecipes);
recipesRouter.get('/favorites', authenticate, listFavoriteRecipes);

// Generic route must come last
recipesRouter.get('/:id', getRecipeById);

recipesRouter.post(
  '/',
  authenticate,
  upload.single('thumb'),
  parseCreateRecipeInputForm,
  validateBody(recipeSchema),
  createRecipe
);
recipesRouter.delete('/:id', authenticate, deleteRecipe);
recipesRouter.post('/:id/favorite', authenticate, addToFavorites);
recipesRouter.delete('/:id/favorite', authenticate, removeFromFavorites);

export default recipesRouter;
