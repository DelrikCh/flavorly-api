import express from 'express';
import listAreas from '../controllers/areas/listAreas.js';

const router = express.Router();

router.get('/', listAreas);

export default router;
