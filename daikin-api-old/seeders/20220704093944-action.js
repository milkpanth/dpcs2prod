"use strict";
const presetSetting = require("./RolePreset.json");
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const allMenu = await queryInterface.sequelize.query(
      "SELECT * FROM MenuLists",
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    const allRole = await queryInterface.sequelize.query(
      "SELECT * FROM Roles",
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    const insertArray = [];
    for (const setting of presetSetting) {
      const role = allRole.find((x) => x.RoleName == setting.name);
      for (const data of setting.menu) {
        const menu = allMenu.find((x) => x.MenuListName == data.name);
        insertArray.push({
          MenuListID: menu.MenuListID,
          RoleID: role.RoleID,
          Read: data.read,
          IU: data.iu,
          Delete: data.delete,
          Active: data.active,
        });
      }
    }
    queryInterface.bulkInsert("Actions", insertArray);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    queryInterface.bulkDelete("Actions", null, {});
  },
};
