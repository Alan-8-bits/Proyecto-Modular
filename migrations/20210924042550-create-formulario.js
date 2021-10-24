"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("formularios", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      empresa_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "empresas"
          },
          key: "id"
        },
        allowNull: false
      },
      trabajadores_masculinos: {
        type: Sequelize.INTEGER
      },
      trabajadores_femeninos: {
        type: Sequelize.INTEGER
      },
      rengo_edad: {
        type: Sequelize.STRING
      },
      mtrs: {
        type: Sequelize.INTEGER
      },
      niveles: {
        type: Sequelize.INTEGER
      },
      aforo: {
        type: Sequelize.INTEGER
      },
      dispositivo: {
        type: Sequelize.TEXT("long")
      },
      senal: {
        type: Sequelize.TEXT("long")
      },
      medidas: {
        type: Sequelize.STRING
      },
      material: {
        type: Sequelize.TEXT("long")
      },
      riesgo: {
        type: Sequelize.TEXT("long")
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
    await queryInterface.dropTable("formularios");
  }
};
