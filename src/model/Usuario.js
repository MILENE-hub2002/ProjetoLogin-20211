const { Model, DataTypes } = require("sequelize");

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        modelo: DataTypes.STRING,
        placa: DataTypes.STRING,
        senha: DataTypes.STRING,
        foto: DataTypes.STRING,
      },
      { sequelize, freezeTableName: true }
    );
  }
}

module.exports = Usuario;