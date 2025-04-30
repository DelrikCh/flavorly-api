import fs from 'fs/promises';
import path from 'path';

const categoriesPath = path.join(path.resolve(), 'db', 'categories.json');

async function getCategories() {
  try {
    const data = await fs.readFile(categoriesPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading categories file:', error);
    return [];
  }
}

export { getCategories };
