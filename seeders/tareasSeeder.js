"use strict";

/** @type {import('sequelize-cli').Migration} */
const { faker } = require("@faker-js/faker");
const { Usuarios } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener todos los usuarios creados anteriormente
    const usuarios = await Usuarios.findAll();
    // Si no hay usuarios, no se crean tareas
    if (usuarios.length === 0) return;

    const estados = ["PENDIENTE", "REALIZADO", "ELIMINADO"];
    const tareas = [];

    usuarios.forEach((usuario) => {
      for (let i = 0; i < 10; i++) {
        tareas.push({
          titulo: faker.lorem.sentence(3),
          descripcion: faker.lorem.paragraph(),
          estado: estados[Math.floor(Math.random() * estados.length)],
          fechaLimite: faker.date.future(),
          usuarioId: usuario.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    });

    // Insertar todas las tareas en la base de datos
    await queryInterface.bulkInsert("Tareas", tareas, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tareas", null, {});
  },
};
