'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyProfileFile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CompanyProfileFile.belongsTo(models.Language, {foreignKey: 'LangID'})
    }
  }
  CompanyProfileFile.init({
    FileID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Path: DataTypes.TEXT,
    Preview: DataTypes.TEXT,
    CompanyCode: DataTypes.STRING,
    CreatedBy: DataTypes.STRING,
    UpdatedBy: DataTypes.STRING,
    CreatedDate: DataTypes.DATE,
    UpdatedDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CompanyProfileFile',
  });
  return CompanyProfileFile;
};