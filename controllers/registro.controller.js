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
  try {
    const {
      fecha_ingreso,
      estado_pago,
      tipo_pago,
      estado_lavado,
      estado_vehiculo,
      vehiculoId,
    } = req.body;

    await Registro.sync();
    const newRegistro = await Registro.create({
      fecha_ingreso,
      estado_pago,
      tipo_pago,
      estado_lavado,
      estado_vehiculo,
      vehiculoId,
    });
    res.status(201).json(newRegistro);
  } catch (error) {
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
