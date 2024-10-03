'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.belongsToMany(models.UserMember, { 
        through: models.UserRole,
        foreignKey: 'RoleID',
        otherKey: 'UserMemberID'
      })
      Role.hasMany(models.Action, { foreignKey: 'RoleID', onDelete:'CASCADE', onUpdate:'CASCADE' })
    }
  }
  Role.init({
    RoleID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    RoleName: DataTypes.STRING,
    CreatedBy: DataTypes.STRING,
    CreatedDate: DataTypes.DATE,
    UpdatedBy: DataTypes.STRING,
    UpdatedDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};