'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SeriesTemplate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SeriesTemplate.init({
    TemplateID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Path: DataTypes.TEXT('long'),
    CreatedBy: DataTypes.STRING,
    CreatedDate: DataTypes.DATE,
  }, {
    updatedAt: false, 
    sequelize,
    modelName: 'SeriesTemplate',
  });
  return SeriesTemplate;
};