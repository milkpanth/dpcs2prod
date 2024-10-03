'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Actions', {
      ActionID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      MenuListID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'MenuLists',
          key: 'MenuListID'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      RoleID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles',
          key: 'RoleID'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      Read: {
        type: Sequelize.BOOLEAN
      },
      IU: {
        type: Sequelize.BOOLEAN
      },
      Delete: {
        type: Sequelize.BOOLEAN
      },
      Active: {
        type: Sequelize.BOOLEAN
      },
      CreatedBy: {
        allowNull: true,
        type: Sequelize.STRING
      },
      CreatedDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      UpdatedBy: {
        allowNull: true,
        type: Sequelize.STRING
      },
      UpdatedDate: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Actions');
  }
};