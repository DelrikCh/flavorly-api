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

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: List all recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: List of recipes
 */
recipesRouter.get('/', attachUserIfExists, listRecipes);

/**
 * @swagger
 * /recipes/popular:
 *   get:
 *     summary: List popular recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: List of popular recipes
 */
recipesRouter.get('/popular', attachUserIfExists, listPopularRecipes);

/**
 * @swagger
 * /recipes/user/{id}:
 *   get:
 *     summary: List recipes by user ID
 *     tags: [Recipes]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of recipes by user ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
recipesRouter.get('/user/:id?', authenticate, listUserRecipes);

/**
 * @swagger
 * /recipes/favorites:
 *   get:
 *     summary: List favorite recipes
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of favorite recipes
 *       401:
 *         description: Unauthorized
 */
recipesRouter.get('/favorites', authenticate, listFavoriteRecipes);

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     summary: Get recipe by ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: Recipe details
 *       404:
 *         description: Recipe not found
 */
recipesRouter.get('/:id', attachUserIfExists, getRecipeById);

// ingredients is a JSON string
/**
 * @swagger
 * /recipes:
 *   post:
 *     summary: Create a new recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               instructions:
 *                 type: string
 *               thumb:
 *                 type: string
 *                 format: binary
 *               time:
 *                 type: string
 *               area:
 *                 type: string
 *               category:
 *                 type: string
 *               ingredients:
 *                 type: string
 *                 description: JSON string of ingredients
 *                 example: '[{"key":"ingredients","value":"[{\"id\": \"640c2dd963a319ea671e37f5\", \"measure\": \"200g\"}, {\"id\": \"640c2dd963a319ea671e3665\", \"measure\": \"1 cup\"}]","description":"","type":"text","uuid":"07bda525-184f-40c9-8498-73927c76e70a","enabled":true}]'
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
recipesRouter.post(
  '/',
  authenticate,
  upload.single('thumb'),
  parseCreateRecipeInputForm,
  validateBody(recipeSchema),
  createRecipe
);

/**
 * @swagger
 * /recipes/{id}:
 *   delete:
 *     summary: Delete a recipe by ID
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *       401:
 *         description: Unauthorized
 */
recipesRouter.delete('/:id', authenticate, deleteRecipe);

/**
 * @swagger
 * /recipes/{id}/favorite:
 *   post:
 *     summary: Add a recipe to favorites
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: Recipe added to favorites successfully
 *       401:
 *         description: Unauthorized
 */
recipesRouter.post('/:id/favorite', authenticate, addToFavorites);

/**
 * @swagger
 * /recipes/{id}/favorite:
 *   delete:
 *     summary: Remove a recipe from favorites
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: Recipe removed from favorites successfully
 *       401:
 *         description: Unauthorized
 */
recipesRouter.delete('/:id/favorite', authenticate, removeFromFavorites);

export default recipesRouter;
