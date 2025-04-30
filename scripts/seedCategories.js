import seed from './seedBase.js';
import Category from '../models/Category.js';

seed(
  'data/categories.json',
  (cat) => ({
    id: cat._id.$oid,
    name: cat.name,
  }),
  Category
);
