import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import getAllTestimonials from '../../services/testimonials/getAllTestimonials.js';

const listTestimonials = async (req, res) => {
  const testimonials = await getAllTestimonials();
  res.status(200).json(testimonials);
};

export default ctrlWrapper(listTestimonials);
