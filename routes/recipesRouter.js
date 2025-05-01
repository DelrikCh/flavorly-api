import express from 'express';
import authenticate from '../middlewares/authenticate.js';

import listRecipes from '../controllers/recipes/listRecipes.js';
import getRecipeById from '../controllers/recipes/getRecipeById.js';
import getPopularRecipes from '../controllers/recipes/getPopularRecipes.js';

import createRecipe from '../controllers/recipes/createRecipe.js';
import deleteRecipe from '../controllers/recipes/deleteRecipe.js';
import getMyRecipes from '../controllers/recipes/getMyRecipes.js';

import addToFavorites from '../controllers/recipes/addToFavorites.js';
import removeFromFavorites from '../controllers/recipes/removeFromFavorites.js';
import getFavoriteRecipes from '../controllers/recipes/getFavoriteRecipes.js';

import validateBody from '../helpers/validateBody.js';
import recipeSchema from '../schemas/recipes/createRecipeSchema.js';

const recipesRouter = express.Router();

// Public routes
recipesRouter.get('/list', listRecipes);
recipesRouter.get('/popular', getPopularRecipes);
recipesRouter.get('/:id', getRecipeById);

// Private routes (require auth)
recipesRouter.use(authenticate);

recipesRouter.post('/', validateBody(recipeSchema), createRecipe);
recipesRouter.delete('/:id', deleteRecipe);
recipesRouter.get('/my', getMyRecipes);

recipesRouter.post('/:id/favorite', addToFavorites);
recipesRouter.delete('/:id/favorite', removeFromFavorites);
recipesRouter.get('/favorites', getFavoriteRecipes);

export default recipesRouter;
