import fs from 'fs';
import path from 'path';
import { connectDB, sequelize } from '../db/index.js';
import Category from '../models/Category.js';

const seed = async () => {
  try {
    await connectDB();

    console.log('Tables synced');

    const filePath = path.resolve('data/categories.json');
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const categories = jsonData.map((cat) => ({
      id: cat._id.$oid,
      name: cat.name,
    }));

    await Category.sync();
    await Category.bulkCreate(categories);
    console.log('Categories seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
};

seed();
