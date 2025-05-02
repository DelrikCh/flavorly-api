import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import addRecipe from '../../services/recipes/createRecipe.js';

const createRecipe = async (req, res) => {
  const newRecipe = await addRecipe({
    ...req.body,
    ownerId: req.user.id,
  });

  res.status(201).json(newRecipe);
};

export default ctrlWrapper(createRecipe);
