import Joi from 'joi';

const followSchema = Joi.object({
  userId: Joi.string().required(),
});

export default followSchema;
