import { Model, DataTypes } from 'sequelize';
import { ObjectId } from 'bson';
import { sequelize } from '../db/index.js';

class Recipe extends Model {
  static associate(models) {
    Recipe.belongsTo(models.User, { as: 'owner', foreignKey: 'ownerId' });
    Recipe.belongsToMany(models.Ingredient, {
      through: models.RecipeIngredient,
      foreignKey: 'recipeId',
      otherKey: 'ingredientId',
    });
    Recipe.belongsToMany(models.User, {
      through: models.Favorite,
      foreignKey: 'recipeId',
      as: 'favoritedBy',
    });
  }
}

Recipe.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => new ObjectId().toString(),
    },
    ownerId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    title: DataTypes.STRING,
    area: DataTypes.STRING,
    category: DataTypes.STRING,
    instructions: DataTypes.TEXT,
    description: DataTypes.TEXT,
    thumb: DataTypes.STRING,
    time: DataTypes.STRING,
    favoritesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Recipe',
    tableName: 'recipes',
    timestamps: true,
  }
);

export default Recipe;
