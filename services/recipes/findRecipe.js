import models from '../../models/index.js';

const findRecipe = async (id) => {
  return await models.Recipe.findByPk(id);
};

export default findRecipe;
