'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SubSections', {
      SubID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SectionID: {
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING
      },
      Active: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      CreatedDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      UpdatedDate: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SubSections');
  }
};