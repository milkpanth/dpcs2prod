'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserMember.belongsToMany(models.Role, { 
        through: models.UserRole,
        foreignKey: 'UserMemberID',
        otherKey: 'RoleID'
      })
      //UserMember.hasOne(models.UserPrefix, {foreignKey: 'PrefixID'})
      //UserMember.hasOne(models.Position, {foreignKey: 'PositionID'})
      UserMember.hasOne(models.Country, {foreignKey: 'CountryID'})
      UserMember.hasMany(models.UserLog, {foreignKey: 'UserMemberID'})
      UserMember.belongsTo(models.CompanyProfile, {foreignKey: 'CompanyCode'})
    }
    getFullname() {
      return [this.UserMemberName, this.UserMemberSurname].join(' ');
    }
  }
  UserMember.init({
    UserMemberID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    /*PrefixID: {
      type:DataTypes.INTEGER,
    },
    PositionID: {
      type:DataTypes.INTEGER,
    },*/
    CountryID: DataTypes.INTEGER,
    UserMemberName: DataTypes.STRING,
    UserMemberSurname: DataTypes.STRING,
    UserMemberEmail: DataTypes.STRING,
    UserMemberPhone: DataTypes.STRING,
    UserMemberStatus: DataTypes.BOOLEAN,
    AdminType: DataTypes.ENUM("GLOBAL","LOCAL","ZONE_ASIA","ZONE_AFRICA","ZONE_EUROPE","ZONE_AMERICA","ZONE_ANTARCTICA","ZONE_AUSTRALIA"),
    CreatedBy: DataTypes.STRING,
    CreatedDate: DataTypes.DATE,
    UpdatedBy: DataTypes.STRING,
    UpdatedDate: DataTypes.DATE,
    RecentLogin: DataTypes.DATE,
    DeletedDate: DataTypes.DATE
  }, {
    sequelize,
    paranoid: true,
    modelName: 'UserMember',
  });
  return UserMember;
};