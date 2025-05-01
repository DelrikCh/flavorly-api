import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Pool } from 'pg';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Читаємо JSON-файл
const categoriesPath = path.join(__dirname, '../data/categories.json');
const rawData = fs.readFileSync(categoriesPath);
const categories = JSON.parse(rawData);

// Налаштування PostgreSQL
const pool = new Pool({
  connectionString: process.env.BASE_URL,
});

const seedCategories = async () => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Очистити таблицю перед імпортом (опційно)
    await client.query('DELETE FROM categories');

    // Вставити дані
    const insertQuery = `
      INSERT INTO categories (id, name, url)
      VALUES ($1, $2, $3)
    `;

    for (const category of categories) {
      const id = category._id?.$oid || null;
      const { name, url } = category;
      await client.query(insertQuery, [id, name, url]);
    }

    await client.query('COMMIT');
    console.log('✅ Categories imported successfully!');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Import error', error);
  } finally {
    client.release();
    process.exit();
  }
};

// seedCategories();
export default seedCategories;
