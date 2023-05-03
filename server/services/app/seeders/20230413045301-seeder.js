"use strict";

const { hashPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
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
    await queryInterface.bulkInsert(
      "Users",
      require("../db.json").authors.map((e) => {
        delete e.id;
        e.password = hashPassword(e.password);
        e.createdAt = new Date();
        e.updatedAt = new Date();
        return e;
      }),
      {}
    );

    await queryInterface.bulkInsert(
      "Categories",
      require("../db.json").categories.map((e) => {
        delete e.id;
        e.createdAt = new Date();
        e.updatedAt = new Date();
        return e;
      }),
      {}
    );

    await queryInterface.bulkInsert(
      "Posts",
      require("../db.json").posts.map((e) => {
        delete e.id;
        e.createdAt = new Date();
        e.updatedAt = new Date();
        return e;
      }),
      {}
    );

    await queryInterface.bulkInsert(
      "Tags",
      require("../db.json").tags.map((e) => {
        delete e.id;
        e.createdAt = new Date();
        e.updatedAt = new Date();
        return e;
      }),
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
