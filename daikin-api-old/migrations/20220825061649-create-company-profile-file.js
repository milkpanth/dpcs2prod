'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CompanyProfileFiles', {
      FileID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Path: {
        type: Sequelize.TEXT
      },
      Preview: {
        type: Sequelize.TEXT
      },
      CompanyCode: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'CompanyProfiles',
          key: 'CompanyCode'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      LangID: {
        allowNull: false,
        type: Sequelize.CHAR(2),
        references: {
          model: 'Languages',
          key: 'LangID'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('CompanyProfileFiles');
  }
};