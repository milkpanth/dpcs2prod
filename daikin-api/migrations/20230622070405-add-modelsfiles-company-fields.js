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
    await queryInterface.addColumn('ModelFiles', 'CompanyCode', { 
      allowNull: true,
        type: Sequelize.STRING,
        references: {
          model: 'CompanyProfiles',
          key: 'CompanyCode'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('ModelFiles', 'CompanyCode');
  }
};
