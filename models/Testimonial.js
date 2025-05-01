import { DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js';

const Testimonial = sequelize.define(
  'Testimonial',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    testimonials: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'testimonials',
    timestamps: false,
  }
);

export default Testimonial;
