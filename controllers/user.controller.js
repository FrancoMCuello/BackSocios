const db = require("../db/db");
const fs = require("fs");
const User = require("../model/user.model");
const Vehiculo = require("../model/vehiculo.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Vehiculo,
        attributes: ["patente"],
      },
    });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Intente más tarde" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "No se encuentra Usuario" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Intente más tarde" });
  }
};

const createUser = async (req, res) => {
  try {
    const { nombre, apellido, contacto } = req.body;
    await User.sync();
    const newUser = await User.create({ nombre, apellido, contacto });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Intente mas tarde" });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "No se encuentra Usuario" });
    }
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Intente más tarde" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "No se encuentra Usuario" });
    }
    await user.destroy();
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Intente más tarde" });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
