'use strict';
const {
  Model
} = require('sequelize');
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
    }
  }
  ModelFile.init({
    FileID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    SectionID: DataTypes.INTEGER,
    SubSectionID: DataTypes.INTEGER,
    Revision: DataTypes.INTEGER,
    Path: DataTypes.TEXT('long'),
    Preview: DataTypes.TEXT('long')
  }, {
    sequelize,
    modelName: 'ModelFile',
  });
  return ModelFile;
};