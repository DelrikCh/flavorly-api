import express from 'express';
import listIngredients from '../controllers/ingredients/listIngredients.js';

const router = express.Router();

router.get('/', listIngredients);

export default router;
