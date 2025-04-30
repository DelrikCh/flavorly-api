import express from 'express';
import listCategories from '../controllers/categories/listCategories.js';

const categoriesRouter = express.Router();

categoriesRouter.get('/', listCategories);

export default categoriesRouter;
