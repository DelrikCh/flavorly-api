import getAllIngredients from '../../services/ingridients/getIngredients.js';

const listIngredients = async (req, res, next) => {
  try {
    const ingredients = await getAllIngredients();
    res.status(200).json(ingredients);
  } catch (error) {
    next(error);
  }
};

export default listIngredients;
