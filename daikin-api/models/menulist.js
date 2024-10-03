'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MenuList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MenuList.init({
    MenuListID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    MenuListName: DataTypes.STRING,
    CreatedBy: DataTypes.STRING,
    CreatedDate: DataTypes.DATE,
    UpdatedBy: DataTypes.STRING,
    UpdatedDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'MenuList',
  });
  return MenuList;
};