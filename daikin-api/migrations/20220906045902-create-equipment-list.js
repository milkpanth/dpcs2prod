'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EquipmentLists', {
      ELID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProposalID: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Proposals',
          key: 'ProposalID'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
      /*SeriesID: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Series',
          key: 'SeriesID'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },*/
      Description: {
        type: Sequelize.TEXT
      },
      Quantity: {
        type: Sequelize.INTEGER
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
      CreatedDate: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EquipmentLists');
  }
};