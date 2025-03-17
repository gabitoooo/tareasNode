"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tareas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tareas.init(
    {
      titulo: DataTypes.STRING,
      descripcion: DataTypes.STRING,
      estado: DataTypes.STRING,
      fechaLimite: DataTypes.DATE,
      usuarioId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tareas",
    }
  );
  Tareas.associate = (models) => {
    Tareas.belongsTo(models.Usuarios, { foreignKey: "usuarioId" });
  };
  return Tareas;
};
