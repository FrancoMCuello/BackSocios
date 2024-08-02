const db = require("../db/db");
const fs = require("fs");
const Vehiculo = require("../model/vehiculo.model");
const User = require("../model/user.model");
const Registro = require("../model/registro.model");

const getAllVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.findAll({
      include: [
        {
          model: User,
          attributes: ["nombre", "apellido"],
        },
        {
          model: Registro,
          attributes: ["id", "tipo_pago", "estado_vehiculo"],
        },
      ],
    });
    res.json(vehiculos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Intente más tarde" });
  }
};

const getVehiculo = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByPk(req.params.id);
    if (!vehiculo) {
      return res.status(404).json({ error: "No se encuentra Vehiculo" });
    }
    res.json(vehiculo);
  } catch (err) {
    res.status(500).json({ error: "Intente más tarde" });
  }
};

const getVehiculoPatente = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findOne({
      where: { patente: req.params.patente },
      include: {
        model: User,
      },
    });
    if (!vehiculo) {
      return res.status(404).json({ error: "No se encuentra vehiculo" });
    }
    res.json(vehiculo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Intente más tarde" });
  }
};

const createVehiculo = async (req, res) => {
  try {
    const { patente, marca, modelo, userId } = req.body;
    await Vehiculo.sync();
    const newVehiculo = await Vehiculo.create({
      patente,
      marca,
      modelo,
      userId,
    });
    res.status(201).json(newVehiculo);
  } catch (error) {
    res.status(500).json({ error: "Intente mas tarde" });
  }
};

const updateVehiculo = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByPk(req.params.id);
    if (!vehiculo) {
      return res.status(404).json({ error: "No se encuentra Vehiculo" });
    }
    await vehiculo.update(req.body);
    res.json(vehiculo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Intente más tarde" });
  }
};

const deleteVehiculo = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByPk(req.params.id);
    if (!vehiculo) {
      return res.status(404).json({ error: "No se encuentra Vehiculo" });
    }
    await vehiculo.destroy();
    res.json({ message: "Vehiculo eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Intente más tarde" });
  }
};

module.exports = {
  getAllVehiculos,
  getVehiculo,
  getVehiculoPatente,
  createVehiculo,
  updateVehiculo,
  deleteVehiculo,
};
