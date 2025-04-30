import fs from 'fs';
import path from 'path';
import { connectDB } from '../db/index.js';
import Category from '../models/Category.js';

const seed = async (jsonPath, mapFn, model) => {
  try {
    await connectDB();

    console.log('Tables synced');

    const filePath = path.resolve(jsonPath);
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const mappedData = jsonData.map(mapFn);

    await model.sync();
    await model.bulkCreate(mappedData);
    console.log(`${model.name} seeded successfully`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
};

export default seed;
