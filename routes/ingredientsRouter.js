import express from 'express';
import listIngredients from '../controllers/ingredients/listIngredients.js';

const router = express.Router();

/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: List all ingredients
 *     tags: [Ingredients]
 *     responses:
 *       200:
 *         description: List of ingredients
 */
router.get('/', listIngredients);

export default router;
