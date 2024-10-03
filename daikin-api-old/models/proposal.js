'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Proposal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Proposal.hasMany(models.EquipmentList, {foreignKey: 'ProposalID'})
      Proposal.hasOne(models.GenericList, {foreignKey: 'ProposalID'})
      Proposal.hasOne(models.ProjectSectionList, {foreignKey: 'ProposalID'})
      Proposal.belongsTo(models.UserMember, {foreignKey: 'CreatedBy'})
    }
  }
  Proposal.init({
    ProposalID: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true
    },
    ProjectName: DataTypes.TEXT,
    CustomerName: DataTypes.TEXT,
    ProjectAddress: DataTypes.TEXT,
    CompanyProfileLanguage: DataTypes.CHAR(2),
    Type: DataTypes.ENUM('PROJECT', 'GENERIC'),
    PDFFile: DataTypes.TEXT,
    PPTXFile: DataTypes.TEXT,
    CreatedBy: DataTypes.STRING,
    ExpireDate: DataTypes.DATE,
    CreatedDate: DataTypes.DATE,
    DeletedDate: DataTypes.DATE,
  }, {
    updatedAt: false,
    paranoid: true,
    sequelize,
    modelName: 'Proposal',
  });
  return Proposal;
};