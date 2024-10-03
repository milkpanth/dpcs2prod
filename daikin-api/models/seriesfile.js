"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SeriesFile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SeriesFile.belongsTo(models.Language, {foreignKey: 'LangID'})
      SeriesFile.belongsTo(models.CompanyProfile, {foreignKey: 'CompanyCode'})
    }
  }
  SeriesFile.init(
    {
      FileID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Revision: DataTypes.INTEGER,
      Path: DataTypes.TEXT("long"),
      Preview: DataTypes.TEXT("long"),
      PageCounter: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "SeriesFile",
    }
  );
  return SeriesFile;
};
