'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GenericFiles', {
      FileID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      GenericSubTypeID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'GenericSubTypes',
          key: 'GenericSubTypeID'
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
      Path: {
        type: Sequelize.TEXT('long')
      },
      Preview: {
        type: Sequelize.TEXT('long')
      },
      Detail: {
        type: Sequelize.TEXT('medium')
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
    await queryInterface.dropTable('GenericFiles');
  }
};