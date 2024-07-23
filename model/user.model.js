const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contacto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "user",
    tableName: "users", // We need to choose the model name
    freezeTableName: true,
    timestamps: false,
  }
);

// the defined model is the class itself
console.log(User === sequelize.models.User); // true

module.exports = User;
