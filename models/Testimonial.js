import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/index.js';

class Testimonial extends Model {
  static associate(models) {
    Testimonial.belongsTo(models.User, { as: 'owner', foreignKey: 'ownerId' });
  }
}

Testimonial.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    ownerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    testimonial: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Testimonial',
    tableName: 'testimonials',
    timestamps: false,
  }
);

export default Testimonial;
