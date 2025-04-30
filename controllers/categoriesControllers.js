import * as categoriesServices from '../services/categoriesServices.js';

export const getCategories = (req, res) => {
  categoriesServices
    .getCategories()
    .then((categories) => {
      return res.status(200).json(
        // Return "name": "category" for each category
        categories.map((category) => {
          return {
            name: category.name,
          };
        })
      );
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    });
};
