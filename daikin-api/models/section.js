'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Section.hasMany(models.SubSection, { foreignKey: 'SectionID', onDelete:'CASCADE', onUpdate:'CASCADE' })
    }
  }
  Section.init({
    SectionID: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true
    },
    Name: DataTypes.STRING,
    Order: DataTypes.INTEGER,
    Orderable: DataTypes.BOOLEAN,
    Active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Section',
  });
  return Section;
};