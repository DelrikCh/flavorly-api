import Joi from 'joi';

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).options({ abortEarly: false });

export default userLoginSchema;
