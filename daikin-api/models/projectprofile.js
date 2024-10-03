'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProjectProfile.init({
    CompanyCode: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ProjectName: DataTypes.TEXT,
    CustomerName: DataTypes.TEXT,
    ProjectAddress: DataTypes.TEXT,
    Type: DataTypes.ENUM('PROJECT', 'GENERIC')
  }, {
    sequelize,
    modelName: 'ProjectProfile',
  });
  return ProjectProfile;
};