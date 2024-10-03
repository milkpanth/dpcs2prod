'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    queryInterface.bulkInsert('MenuLists', [{
      MenuListName: 'Model Master'
    },{
      MenuListName: 'Series Master'
    },{
      MenuListName: 'Slides Master'
    },{
      MenuListName: 'Generic Slides'
    },{
      MenuListName: 'Company Profile'
    },{
      MenuListName: 'Create Proposal'
    },{
      MenuListName: 'External User Manage'
    },{
      MenuListName: 'Internal User Manage'
    },{
      MenuListName: 'Role Assignment'
    },{
      MenuListName: 'Proposal Creation Summary Report'
    },{
      MenuListName: 'Access Log'
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete('MenuLists', null, {});
  }
};
