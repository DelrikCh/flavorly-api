import Testimonial from '../../models/Testimonial.js';

const getAllTestimonials = async () => {
  return Testimonial.findAll();
};

export default getAllTestimonials;
