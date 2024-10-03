'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Slides', {
      SlideID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Version: {
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
      EOL: {
        allowNull: false,
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

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Slides');
  }
};
