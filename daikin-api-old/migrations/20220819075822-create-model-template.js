'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ModelTemplates', {
      TemplateID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Path: {
        type: Sequelize.TEXT('long')
      },
      CreatedBy: {
        allowNull: true,
        type: Sequelize.STRING
      },
      CreatedDate: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ModelTemplates');
  }
};