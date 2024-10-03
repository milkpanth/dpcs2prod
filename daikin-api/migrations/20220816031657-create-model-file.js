'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ModelFiles', {
      FileID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ModelID: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Models',
          key: 'ModelID'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      Revision: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      SectionID: {
        allowNull: true,
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
    await queryInterface.dropTable('ModelFiles');
  }
};