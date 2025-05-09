const parseCreateRecipeInputForm = async (req, res, next) => {
  // Parse ingredients JSON into an object if it's a string
  const ingredients = req.body.ingredients;
  if (typeof ingredients === 'string') {
    try {
      req.body.ingredients = JSON.parse(ingredients);
    } catch (error) {
      console.error('Error parsing ingredients JSON:', error);
      return res
        .status(400)
        .json({ error: 'Invalid JSON format for ingredients' });
    }
  } else {
    return res.status(400).json({
      error: 'Ingredients must be a JSON string',
    });
  }

  // Fill thumb field with the uploaded file name if it exists
  if (req.file) {
    req.body.thumb = req.file.path;
  }

  next();
};

export default parseCreateRecipeInputForm;
