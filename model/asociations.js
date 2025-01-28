const User = require("./user.model");
const Vehiculo = require("./vehiculo.model");
const Registro = require("./registro.model");

//relacion Usuario Vehiculo
User.hasMany(Vehiculo, { forignKey: "userId" });
Vehiculo.belongsTo(User, { forignKey: "userId" });

//relacion Vehiculo Registro
Vehiculo.hasMany(Registro, { forignKey: "vehiculoId" });
Registro.belongsTo(Vehiculo, { forignKey: "vehiculoId" });
