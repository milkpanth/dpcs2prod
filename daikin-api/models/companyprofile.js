'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CompanyProfile.hasMany(models.CompanyProfileFile, { foreignKey: 'CompanyCode' })
    }
  }
  CompanyProfile.init({
    CompanyCode: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true
    },
    Name: DataTypes.STRING,
    CreatedBy: DataTypes.STRING,
    UpdatedBy: DataTypes.STRING,
    CreatedDate: DataTypes.DATE,
    UpdatedDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CompanyProfile',
  });
  return CompanyProfile;
};