import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize } from '../db/index.js';
import models from '../models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedData = async () => {
  try {
    await sequelize.sync({ force: true }); // !!! Drops and recreates all tables

    // Load and insert Areas
    const areasData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/areas.json'), 'utf-8')
    );
    await models.Area.bulkCreate(
      areasData.map((area) => ({
        id: area._id.$oid,
        name: area.name,
      }))
    );
    console.log('Areas seeded successfully.');

    // Load and insert Categories
    const categoriesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/categories.json'), 'utf-8')
    );
    await models.Category.bulkCreate(
      categoriesData.map((category) => ({
        id: category._id.$oid,
        name: category.name,
        thumbnailUrl: category.url,
      }))
    );
    console.log('Categories seeded successfully.');

    // Load and insert Users
    const usersData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/users.json'), 'utf-8')
    );
    await models.User.bulkCreate(
      usersData.map((user) => ({
        id: user._id.$oid,
        name: user.name,
        email: user.email,
        password: user.password || 'DummyPassword', // Default password if not provided
        avatar: user.avatar,
        addedRecipes: user.addedRecipes || 0, // Default to 0 if not provided
        favoriteRecipes: user.favoriteRecipes || 0, // Default to 0 if not provided
        followers: user.followers.length,
        following: user.following.length,
      }))
    );
    console.log('Users seeded successfully.');

    // Load and insert Ingredients
    const ingredientsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/ingredients.json'), 'utf-8')
    );
    await models.Ingredient.bulkCreate(
      ingredientsData.map((ingredient) => ({
        id: ingredient._id,
        name: ingredient.name,
        desc: ingredient.desc,
        img: ingredient.img,
      }))
    );
    console.log('Ingredients seeded successfully.');

    // Load and insert Recipes
    const recipesData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../data/recipes.json'), 'utf-8')
    );
    for (const rec of recipesData) {
      const recipe = await models.Recipe.create({
        id: rec._id.$oid,
        ownerId: rec.owner?.$oid,
        title: rec.title,
        instructions: rec.instructions,
        description: rec.description,
        thumb: rec.thumb,
        time: rec.time,
        createdAt: new Date(parseInt(rec.createdAt.$date.$numberLong)),
        updatedAt: new Date(parseInt(rec.updatedAt.$date.$numberLong)),
        areaId: rec.area,
        categoryId: rec.category,
      });
      console.log(`Recipe ${recipe.id} seeded successfully.`);

      // Associate Ingredients
      for (const ing of rec.ingredients) {
        await models.RecipeIngredient.create({
          recipeId: recipe.id,
          ingredientId: ing.id,
          measure: ing.measure,
        });
      }
      console.log(`Ingredients for recipe ${recipe.id} seeded successfully.`);
    }
    console.log('Recipes seeded successfully.');

    console.log('Data seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
