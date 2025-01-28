require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./db/db");
require("./model/syncModels");
require("./model/asociations");

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/registros", require("./router/registro.router"));
app.use("/vehiculos", require("./router/vehiculo.router"));
app.use("/user", require("./router/user.router"));
/* app.use("/auth", require("./router/auth.router"));
const users = require("./models/user.model"); */

app.get("/", (req, res) => {
  res.json("Bienvenido a nuestra API.");
});

/* async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conectado a la bd!!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
} */

testConnection();

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
