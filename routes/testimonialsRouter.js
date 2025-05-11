import express from 'express';
import listTestimonials from '../controllers/testimonials/listTestimonials.js';

const testimonialsRouter = express.Router();

/**
 * @swagger
 * /tertimonials:
 *   get:
 *     summary: List all testimonials
 *     tags: [Testimonials]
 *     responses:
 *       200:
 *         description: List of testimonials
 */
testimonialsRouter.get('/', listTestimonials);

export default testimonialsRouter;
