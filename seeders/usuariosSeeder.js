"use strict";

/** @type {import('sequelize-cli').Migration} */

const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Usuarios",
      [
        {
          nombre: "gerinimo perez",
          email: "g@gmail.com",
          password: "123456789", 
          admin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    const usuarios = [];
    for (let i = 0; i < 10; i++) {
      usuarios.push({
        nombre: faker.person.fullName(),
        email: faker.internet.email(),
        //password: await bcrypt.hash('123', 10),
        password: "123qwe", // Encripta la contraseña
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
