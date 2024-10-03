"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ModelFile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ModelFile.belongsTo(models.Language, {foreignKey: 'LangID'})
      ModelFile.belongsTo(models.CompanyProfile, {foreignKey: 'CompanyCode'})
    }
  }
  ModelFile.init(
    {
      FileID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      SectionID: DataTypes.INTEGER,
      Revision: DataTypes.INTEGER,
      Path: DataTypes.TEXT("long"),
      Preview: DataTypes.TEXT("long"),
      PageCounter: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "ModelFile",
    }
  );
  return ModelFile;
};
