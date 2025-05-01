import Recipe from '../../models/Recipe.js';

const getRecipes = async ({ where, include, offset, limit }) => {
  const result = await Recipe.findAndCountAll({
    where,
    include,
    offset,
    limit,
  });

  return result;
};

export default getRecipes;
