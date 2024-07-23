const User = require("./user.model");
const Vehiculo = require("./vehiculo.model");
const Registro = require("./registro.model");

//relacion Usuario Vehiculo
User.hasMany(Vehiculo);
Vehiculo.belongsTo(User);

//relacion Vehiculo Registro
Vehiculo.hasMany(Registro);
Registro.belongsTo(Vehiculo);
