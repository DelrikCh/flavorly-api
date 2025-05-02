import express from 'express';
import listTestimonials from '../controllers/testimonials/listTestimonials.js';

const testimonialsRouter = express.Router();

testimonialsRouter.get('/', listTestimonials);

export default testimonialsRouter;
