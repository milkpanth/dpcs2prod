'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Action extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Action.belongsTo(models.MenuList, {foreignKey: 'MenuListID'})
      Action.belongsTo(models.Role, {foreignKey: 'RoleID'})
    }
  }
  Action.init({
    ActionID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    MenuListID: DataTypes.INTEGER,
    RoleID: DataTypes.INTEGER,
    Read: DataTypes.BOOLEAN,
    // Insert and Update
    IU: DataTypes.BOOLEAN,
    Delete: DataTypes.BOOLEAN,
    Active: DataTypes.BOOLEAN,
    CreatedBy: DataTypes.STRING,
    CreatedDate: DataTypes.DATE,
    UpdatedBy: DataTypes.STRING,
    UpdatedDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Action',
  });
  return Action;
};