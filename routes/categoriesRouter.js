import express from 'express';
import listCategories from '../controllers/categories/listCategories.js';

const categoriesRouter = express.Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: List all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 */
categoriesRouter.get('/', listCategories);

export default categoriesRouter;
