'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectSectionList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProjectSectionList.init({
    PSLID:  {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ProposalID: DataTypes.STRING,
    SectionArrayText: DataTypes.TEXT,
    SubSectionArrayText:  DataTypes.TEXT
  }, {
    timestamps: false,
    sequelize,
    modelName: 'ProjectSectionList',
  });
  return ProjectSectionList;
};