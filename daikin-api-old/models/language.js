'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Language.init({
    LangID: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.CHAR(2)
    },
    Name: DataTypes.STRING
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Language',
  });
  return Language;
};