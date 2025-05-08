import Joi from 'joi';

const recipeSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
  instructions: Joi.string().min(10).required(),
  thumb: Joi.string().uri().required(),
  time: Joi.string().pattern(/^\d+$/).required(),
  area: Joi.string().required(),
  category: Joi.string().required(),
  ingredients: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        measure: Joi.string().required(),
      })
    )
    .min(1)
    .required(),
});

export default recipeSchema;
