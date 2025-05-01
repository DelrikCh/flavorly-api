import Joi from 'joi';

const userAuthSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(3).required(),
}).options({ abortEarly: false });

export default userAuthSchema;
