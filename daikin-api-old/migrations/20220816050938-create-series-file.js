'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SeriesFiles', {
      FileID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SeriesID: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Series',
          key: 'SeriesID'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      Revision: {
        type: Sequelize.INTEGER
      },
      Path: {
        type: Sequelize.TEXT('long')
      },
      Preview: {
        type: Sequelize.TEXT('long')
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
    await queryInterface.dropTable('SeriesFiles');
  }
};