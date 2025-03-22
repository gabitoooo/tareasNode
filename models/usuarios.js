"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usuarios.init(
    {
      nombre: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,    
    },
    {
      sequelize,
      modelName: "Usuarios",    
    }
  );

  Usuarios.prototype.toJSON = function () {
    let values = { ...this.get() };    
    delete values.password;
    delete values.id;
    delete values.createdAt;
    delete values.updatedAt;
    return values;
  };

  Usuarios.associate = (models) => {
    Usuarios.hasMany(models.Tareas, { foreignKey: "usuarioId" });
  };

  return Usuarios;
};
