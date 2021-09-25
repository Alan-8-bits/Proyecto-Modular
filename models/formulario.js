'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class formulario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.empresa, {
        foreignKey: 'empresa_id',
        allowNull: false
      });
    }
  };
  formulario.init({
    respuestas: DataTypes.STRING,
    respuesta_modelo_ML: DataTypes.STRING,
    direccion_archivo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'formulario',
  });
  return formulario;
};