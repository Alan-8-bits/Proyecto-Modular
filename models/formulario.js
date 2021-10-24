"use strict";
const { Model } = require("sequelize");
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
        foreignKey: "empresa_id",
        allowNull: false
      });
    }
  }
  formulario.init(
    {
      trabajadores_masculinos: DataTypes.INTEGER,
      trabajadores_femeninos: DataTypes.INTEGER,
      rengo_edad: DataTypes.STRING,
      mtrs: DataTypes.INTEGER,
      niveles: DataTypes.INTEGER,
      aforo: DataTypes.INTEGER,
      dispositivo: DataTypes.TEXT("long"),
      senal: DataTypes.TEXT("long"),
      medidas: DataTypes.STRING,
      material: DataTypes.TEXT("long"),
      riesgo: DataTypes.TEXT("long")
    },
    {
      sequelize,
      modelName: "formulario"
    }
  );
  return formulario;
};
