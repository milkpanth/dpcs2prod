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
    await queryInterface.bulkInsert('Roles', [{
      RoleID: 1,
      RoleName: 'Master Admin'
    },{
      RoleID: 2,
      RoleName: 'Role Admin'
    },{
      RoleID: 3,
      RoleName: 'User Admin'
    },{
      RoleID: 4,
      RoleName: 'Slides Admin'
    },{
      RoleID: 5,
      RoleName: 'System Admin'
    },{
      RoleID: 6,
      RoleName: 'Sale Rep Manager'
    },{
      RoleID: 7,
      RoleName: 'Sale Rep'
    },{
      RoleID: 8,
      RoleName: 'External User'
    },{
      RoleID: 9,
      RoleName: 'Local Slides Admin'
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete('Roles', null, {});
  }
};
