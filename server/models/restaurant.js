'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Restaurant.hasMany(models.Item, { foreignKey: 'restaurant_id' })
    }
  }
  Restaurant.init({
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
    imageUrl: {
        type: DataTypes.STRING,
    },
    websiteUrl: {
        type: DataTypes.STRING,
    },
    instagramUrl: {
        type: DataTypes.STRING,
    },
    facebookUrl: {
        type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};