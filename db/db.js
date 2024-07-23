const { Sequelize } = require("sequelize");
const bd_config = require("../db/bd_config");

const sequelize = new Sequelize(
  bd_config.database,
  bd_config.username,
  bd_config.password,
  {
    host: bd_config.host,
    dialect: bd_config.dialect,
    port: bd_config.port,
  }
);

module.exports = sequelize;
