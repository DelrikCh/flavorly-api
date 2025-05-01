import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import { sequelize } from '../models/index.js';
import Category from '../models/Category.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Шлях до JSON-файлу
const categoriesPath = path.join(__dirname, '../data/categories.json');
const rawData = fs.readFileSync(categoriesPath);
const categories = JSON.parse(rawData);

// Seed-функція
const seedCategories = async () => {
  try {
    await sequelize.authenticate();
    console.log('🔌 Connected to BD!');

    await Category.sync({ force: true }); // перезаписує таблицю
    await Category.bulkCreate(categories);

    console.log('✅ Categories imported successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Import Error:', error);
    process.exit(1);
  }
};

// seedCategories();
export default seedCategories;
