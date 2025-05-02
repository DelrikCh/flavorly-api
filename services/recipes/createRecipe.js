import models from '../../models/index.js';

const createRecipe = async (payload) => {
  return await models.Recipe.create(payload);
};

export default createRecipe;
