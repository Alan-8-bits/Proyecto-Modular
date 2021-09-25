'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('formularios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      respuestas: {
        type: Sequelize.STRING
      },
      empresa_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'empresas'
          },
          key: 'id'
        },
        allowNull: false
      },
      respuesta_modelo_ML: {
        type: Sequelize.STRING
      },
      direccion_archivo: {
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
    await queryInterface.dropTable('formularios');
  }
};