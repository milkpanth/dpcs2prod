'use strict';

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
    await queryInterface.bulkInsert("SubSections", [
      {
        Name: "General Specifications",
        SectionID: 5,
        Active: true
      },{
        Name: "Sound Data",
        SectionID: 5,
        Active: true
      },{
        Name: "Installation Information",
        SectionID: 5,
        Active: true
      },{
        Name: "Blank 1",
        SectionID: 5,
        Active: false
      },{
        Name: "Blank 2",
        SectionID: 5,
        Active: false
      },{
        Name: "Blank 3",
        SectionID: 5,
        Active: false
      },{
        Name: "General Specifications",
        SectionID: 7,
        Active: true
      },{
        Name: "Sound Data",
        SectionID: 7,
        Active: true
      },{
        Name: "Fan Data",
        SectionID: 7,
        Active: true
      },{
        Name: "Installation Information",
        SectionID: 7,
        Active: true
      },{
        Name: "Blank 1",
        SectionID: 7,
        Active: false
      },{
        Name: "Blank 2",
        SectionID: 7,
        Active: false
      },{
        Name: "Blank 3",
        SectionID: 7,
        Active: false
      },{
        Name: "General Specifications",
        SectionID: 9,
        Active: true
      },{
        Name: "Blank 1",
        SectionID: 9,
        Active: false
      },{
        Name: "Blank 2",
        SectionID: 9,
        Active: false
      },{
        Name: "Blank 3",
        SectionID: 9,
        Active: false
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
    await queryInterface.bulkDelete("SubSections", null, {});
  }
};
