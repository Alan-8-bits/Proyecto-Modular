"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("empresas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      razon_social: {
        type: Sequelize.STRING
      },
      nombre_rep_legal: {
        type: Sequelize.STRING
      },
      rfc: {
        type: Sequelize.STRING
      },
      correo: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      colonia: {
        type: Sequelize.STRING
      },
      codigo_postal: {
        type: Sequelize.INTEGER
      },
      calle_1: {
        type: Sequelize.STRING
      },
      calle_2: {
        type: Sequelize.STRING
      },
      giro: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("empresas");
  }
};
