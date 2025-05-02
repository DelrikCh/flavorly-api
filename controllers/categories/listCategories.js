import getCategories from '../../services/categories/getCategories.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const listCategories = async (_req, res) => {
  const categories = await getCategories();
  res.status(200).json(categories);
};

export default ctrlWrapper(listCategories);
