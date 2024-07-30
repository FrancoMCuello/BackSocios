const db = require("../db/db");
const fs = require("fs");
const Registro = require("../model/registro.model");
const Vehiculo = require("../model/vehiculo.model");
const User = require("../model/user.model");

const getAllRegistros = async (req, res) => {
  try {
    const registros = await Registro.findAll({
      include: [
        {
          model: Vehiculo,
          as: "vehiculo",
          include: [
            {
              model: User,
              attributes: ["nombre", "apellido"],
              as: "user",
            },
          ],
        },
      ],
    });
    res.json(registros);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Intente más tarde" });
  }
};

const getRegistro = async (req, res) => {
  try {
    const registro = await Registro.findByPk(req.params.id);
    if (!registro) {
      return res.status(404).json({ error: "No se encuentra Registro" });
    }
    include: [
      {
        model: models.vehiculos,
      },
    ];
    res.json(registro);
  } catch (err) {
    res.status(500).json({ error: "Intente más tarde" });
  }
};

const createRegistro = async (req, res) => {
  const { nombre, apellido, contacto } = req.body.user;
  const { patente, marca, modelo } = req.body.vehiculo;
  const {
    fecha_ingreso,
    estado_pago,
    tipo_pago,
    estado_lavado,
    estado_vehiculo,
  } = req.body.registro;

  try {
    const result = await db.transaction(async (t) => {
      const crearUsuario = await User.create(
        { nombre, apellido, contacto },
        { transaction: t }
      );

      const crearVehiculo = await Vehiculo.create(
        { patente, modelo, marca, userId: crearUsuario.id },
        { transaction: t }
      );

      const crearRegistro = await Registro.create(
        {
          fecha_ingreso,
          estado_pago,
          tipo_pago,
          estado_lavado,
          estado_vehiculo,
          vehiculoId: crearVehiculo.id,
        },
        { transaction: t }
      );

      return { crearUsuario, crearVehiculo, crearRegistro };
    });

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    console.log("datos recibidos: ", req.body);
    res.status(500).json({ error: "Intente mas tarde" });
  }
};

const updateRegistro = async (req, res) => {
  try {
    const registro = await Registro.findByPk(req.params.id);
    if (!registro) {
      return res.status(404).json({ error: "No se encuentra Usuario" });
    }
    await registro.update(req.body);
    res.json(registro);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Intente más tarde" });
  }
};

const deleteRegistro = async (req, res) => {
  try {
    const registro = await Registro.findByPk(req.params.id);
    if (!registro) {
      return res.status(404).json({ error: "No se encuentra Usuario" });
    }
    await registro.destroy();
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Intente más tarde" });
  }
};

module.exports = {
  getAllRegistros,
  getRegistro,
  createRegistro,
  updateRegistro,
  deleteRegistro,
};
