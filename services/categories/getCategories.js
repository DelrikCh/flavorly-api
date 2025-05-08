import models from '../../models/index.js';

const getCategories = async () => {
  return await models.Category.findAll();
};

export default getCategories;
