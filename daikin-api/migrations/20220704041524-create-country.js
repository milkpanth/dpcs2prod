'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Countries', {
      CountryID: {
        type: Sequelize.CHAR(2),
        allowNull: false,
        primaryKey: true
      },
      CountryName: {
        type: Sequelize.STRING
      },
      CreatedBy: {
        allowNull: true,
        type: Sequelize.STRING
      },
      UpdatedBy: {
        allowNull: true,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Countries');
  }
};