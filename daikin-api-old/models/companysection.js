'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanySection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CompanySection.belongsTo(models.Section, {foreignKey: 'SectionID'})
    }
  }
  CompanySection.init({
    CSID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    CompanyOrder: DataTypes.INTEGER,
    CompanyCode: DataTypes.STRING,
    CreatedBy: DataTypes.STRING,
    UpdatedBy: DataTypes.STRING,
    CreatedDate: DataTypes.DATE,
    UpdatedDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CompanySection',
  });
  return CompanySection;
};