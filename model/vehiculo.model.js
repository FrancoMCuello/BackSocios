const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./user.model");

class Vehiculo extends Model {}

Vehiculo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    patente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "vehiculo",
    tableName: "vehiculos", // We need to choose the model name
    freezeTableName: true,
    timestamps: false,
  }
);

// the defined model is the class itself
console.log(Vehiculo === sequelize.models.Vehiculo); // true

module.exports = Vehiculo;
