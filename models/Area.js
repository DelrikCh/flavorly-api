import { DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js';

const Area = sequelize.define(
  'Area',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'areas',
    timestamps: false,
  }
);

export default Area;
