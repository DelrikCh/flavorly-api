import express from 'express';
import authenticate from '../middlewares/authenticate.js';

import listRecipes from '../controllers/recipes/listRecipes.js';
import getRecipeById from '../controllers/recipes/getRecipeById.js';
import listPopularRecipes from '../controllers/recipes/listPopularRecipes.js';

import createRecipe from '../controllers/recipes/createRecipe.js';
import deleteRecipe from '../controllers/recipes/deleteRecipe.js';
import listMyRecipes from '../controllers/recipes/listMyRecipes.js';

import addToFavorites from '../controllers/recipes/addToFavorites.js';
import removeFromFavorites from '../controllers/recipes/removeFromFavorites.js';
import listFavoriteRecipes from '../controllers/recipes/listFavoriteRecipes.js';

import validateBody from '../helpers/validateBody.js';
import recipeSchema from '../schemas/recipes/createRecipeSchema.js';

const recipesRouter = express.Router();

// Public routes
recipesRouter.get('/', listRecipes);
recipesRouter.get('/popular', listPopularRecipes);
recipesRouter.get('/:id', getRecipeById);

// Private routes (require auth)
recipesRouter.use(authenticate);

recipesRouter.post('/', validateBody(recipeSchema), createRecipe);
recipesRouter.delete('/:id', deleteRecipe);
recipesRouter.get('/my', listMyRecipes);

recipesRouter.post('/:id/favorite', addToFavorites);
recipesRouter.delete('/:id/favorite', removeFromFavorites);
recipesRouter.get('/favorites', listFavoriteRecipes);

export default recipesRouter;
