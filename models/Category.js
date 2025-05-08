import { DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js';

const Category = sequelize.define(
  'Category',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnailUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'categories',
    timestamps: false,
  }
);

export default Category;
