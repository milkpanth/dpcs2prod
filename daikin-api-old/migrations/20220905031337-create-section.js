'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sections', {
      SectionID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Order: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      Orderable: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Sections');
  }
};