import Testimonial from '../../models/Testimonial.js';
import User from '../../models/User.js';

const getAllTestimonials = async () => {
  return Testimonial.findAll({
    include: [
      {
        model: User,
        as: 'owner',
        attributes: ['name'],
      },
    ],
  });
};

export default getAllTestimonials;
