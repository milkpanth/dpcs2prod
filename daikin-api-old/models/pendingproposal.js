'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PendingProposal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PendingProposal.init({
    ID: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    ProposalData: DataTypes.JSON,
    SectionList: DataTypes.JSON,
    EquipList: DataTypes.JSON,
    CreatedDate: DataTypes.DATE,
    CreatedBy: DataTypes.STRING,
    Status: DataTypes.ENUM("PENDING", "WORKING", "SUCCESS", "ERROR"),
    StatusDetail: DataTypes.TEXT,
  }, {
    updatedAt: false,
    sequelize,
    modelName: 'PendingProposal',
  });
  return PendingProposal;
};