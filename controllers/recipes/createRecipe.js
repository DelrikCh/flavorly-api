import path from 'path';
import fs from 'fs/promises';

import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import addRecipe from '../../services/recipes/createRecipe.js';

const createRecipe = async (req, res) => {
  const filename = path.basename(req.body.thumb);
  const destPath = path.join('public', 'recipes', filename);
  await fs.rename(req.body.thumb, destPath);
  req.body.thumb = `${process.env.BASE_URL}/recipes/${filename}`;
  const newRecipe = await addRecipe({
    ...req.body,
    ownerId: req.user.id,
  });

  res.status(201).json(newRecipe);
};

export default ctrlWrapper(createRecipe);
