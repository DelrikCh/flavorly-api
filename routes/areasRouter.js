import express from 'express';
import listAreas from '../controllers/areas/listAreas.js';

const router = express.Router();

/**
 * @swagger
 * /areas:
 *   get:
 *     summary: List all areas
 *     tags: [Areas]
 *     responses:
 *       200:
 *         description: List of areas
 */
router.get('/', listAreas);

export default router;
