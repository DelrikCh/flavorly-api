import getCategories from '../../services/categories/getCategories.js';

const listCategories = async (_req, res, next) => {
  try {
    const categories = await getCategories();

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export default listCategories;
