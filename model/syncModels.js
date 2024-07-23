const sequelize = require("../db/db");
const User = require("./user.model");
const Vehiculo = require("./vehiculo.model");
const Registro = require("./registro.model");
// Importa todos los modelos que necesites

const syncModels = async () => {
  try {
    await sequelize.sync({ force: false }); // Usa { force: true } si quieres reiniciar la tabla (borrará los datos existentes)
    console.log("Models synchronized with the database.");
  } catch (error) {
    console.error("Error synchronizing models:", error);
  }
};

syncModels();
