'use strict';

const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       // define association here
    }
  }
  Item.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    section: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
    },
    categories: DataTypes.ARRAY(DataTypes.STRING),
    restaurant_id: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};