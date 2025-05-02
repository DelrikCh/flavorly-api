import getAllIngredients from '../../services/ingridients/getIngredients.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';

const listIngredients = async (req, res) => {
  const ingredients = await getAllIngredients();
  res.status(200).json(ingredients);
};

export default ctrlWrapper(listIngredients);
