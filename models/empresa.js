"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.formulario, {
        foreignKey: "empresa_id",
        allowNull: false
      });
      this.hasMany(models.inspeccion, {
        foreignKey: "empresa_id",
        allowNull: false
      });
    }
  }
  empresa.init(
    {
      razon_social: DataTypes.STRING,
      nombre_rep_legal: DataTypes.STRING,
      rfc: DataTypes.STRING,
      correo: DataTypes.STRING,
      direccion: DataTypes.STRING,
      colonia: DataTypes.STRING,
      codigo_postal: DataTypes.INTEGER,
      calle_1: DataTypes.STRING,
      calle_2: DataTypes.STRING,
      giro: DataTypes.STRING,
      riesgo: DataTypes.FLOAT
    },
    {
      sequelize,
      modelName: "empresa"
    }
  );
  return empresa;
};
