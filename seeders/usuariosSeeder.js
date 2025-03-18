"use strict";

/** @type {import('sequelize-cli').Migration} */

const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const usuarios = [];
    for (let i = 0; i < 10; i++) {
      usuarios.push({
        nombre: faker.person.fullName(),
        email: faker.internet.email(),
        password: await bcrypt.hash("123qwe", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Usuarios", usuarios, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Usuarios", null, {});
  },
};
