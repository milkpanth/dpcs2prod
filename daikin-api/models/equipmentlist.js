'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EquipmentList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EquipmentList.belongsTo(models.Proposal, {foreignKey: 'ProposalID'})
      EquipmentList.belongsTo(models.Language, {foreignKey: 'LangID'})
    }
  }
  EquipmentList.init({
    ELID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ModelID: DataTypes.STRING,
    Description: DataTypes.TEXT,
    Quantity: DataTypes.INTEGER,
    CreatedDate: DataTypes.DATE
  }, {
    updatedAt: false,
    sequelize,
    modelName: 'EquipmentList',
  });
  return EquipmentList;
};