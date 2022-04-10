'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productReturn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  productReturn.init({
    idAdmin: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER,
    idProduct: DataTypes.INTEGER,
    idTransaction: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'productReturn',
  });
  return productReturn;
};