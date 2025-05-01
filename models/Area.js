import { DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js';

const Area = sequelize.define('Area', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
    tableName: 'areas',
    timestamps: false,
  }
);

export default Area;
