'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Models', {
      ModelID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      ClassID: {
        allowNull: false,
        type: Sequelize.STRING
      },
      SeriesID: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ImagePath: {
        allowNull: true,
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('Models');
  }
};