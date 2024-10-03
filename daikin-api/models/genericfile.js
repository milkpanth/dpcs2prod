'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GenericFile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GenericFile.belongsTo(models.Language, {foreignKey: 'LangID'})
    }
  }
  GenericFile.init({
    FileID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Path: DataTypes.TEXT('long'),
    Preview: DataTypes.TEXT('long'),
    Detail: DataTypes.TEXT('medium'),
    CreatedBy: DataTypes.STRING,
    UpdatedBy: DataTypes.STRING,
    CreatedDate: DataTypes.DATE,
    UpdatedDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'GenericFile',
  });
  return GenericFile;
};