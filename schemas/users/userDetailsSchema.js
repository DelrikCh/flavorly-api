import Joi from 'joi';

const userDetailsSchema = Joi.object({
  userId: Joi.string().required(),
});

export default userDetailsSchema;
