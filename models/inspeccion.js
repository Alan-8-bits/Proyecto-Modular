'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inspeccion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.empresa , {
        foreignKey: 'empresa_id',
        allowNull: false
      });
    }
  };
  inspeccion.init({
    fecha: DataTypes.DATE,
    estatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'inspeccion',
  });
  return inspeccion;
};