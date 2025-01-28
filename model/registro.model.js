const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const Vehiculo = require("./vehiculo.model");

class Registro extends Model {}

Registro.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fecha_ingreso: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    estado_pago: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo_pago: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado_lavado: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado_vehiculo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Vehiculo,
        key: "id",
      },
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Registro",
    tableName: "registros", // We need to choose the model name
    freezeTableName: true, // transforma las tablas al plural
    timestamps: false, //no crea las columnas de tiempo.
  }
);
// the defined model is the class itself
console.log(Registro === sequelize.models.Registro); // true

module.exports = Registro;
