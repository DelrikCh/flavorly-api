import Category from '../../models/Category.js';

const getCategories = async () => {
  return await Category.findAll();
};

export default getCategories;
