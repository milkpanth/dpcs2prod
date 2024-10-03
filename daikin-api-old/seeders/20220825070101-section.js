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
     await queryInterface.bulkInsert("Sections", [
      {
        SectionID: 1,
        Order: 1,
        Name: "Cover Page",
        Orderable: false,
        Active: true
      },
      {
        SectionID: 2,
        Order: 2,
        Name: "Company Profile",
        Orderable: false,
        Active: true
      },
      {
        SectionID: 3,
        Order: 3,
        Name: "Equipment Summary",
        Orderable: true,
        Active: true
      },
      {
        SectionID: 4,
        Order: 4,
        Name: "CU Features",
        Orderable: true,
        Active: true
      },
      {
        SectionID: 5,
        Order: 5,
        Name: "CU Specifications",
        Orderable: true,
        Active: true
      },
      {
        SectionID: 6,
        Order: 6,
        Name: "FCU Features",
        Orderable: true,
        Active: true
      },
      {
        SectionID: 7,
        Order: 7,
        Name: "FCU Specifications",
        Orderable: true,
        Active: true
      },
      {
        SectionID: 8,
        Order: 8,
        Name: "Centralised Controller Features",
        Orderable: true,
        Active: true
      },
      {
        SectionID: 9,
        Order: 9,
        Name: "Centralised Controller Specifications",
        Orderable: true,
        Active: true
      },
      {
        SectionID: 10,
        Order: 10,
        Name: "End Page",
        Orderable: false,
        Active: true
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
     await queryInterface.bulkDelete("Sections", null, {});
  }
};
