'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserRoles', {
      UserRoleID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      UserMemberID: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'UserMembers',
          key: 'UserMemberID'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      RoleID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles',
          key: 'RoleID'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserRoles');
  }
};