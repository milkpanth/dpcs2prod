'use strict';

const { 
  GENERIC,
  PROJECT
} = require("../constants/sequence")

/** @type {import('sequelize-cli').Migration} */
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
     await queryInterface.bulkInsert("ProposalSequences", [
      {
        TypeID: GENERIC,
        Num: 1,
      },{
        TypeID: PROJECT,
        Num: 1
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     queryInterface.bulkDelete("ProposalSequences", null, {});
  }
};
