const express = require("express");
const router = express.Router();
const controller = require("../controllers/vehiculos.controller");

router.get("/", controller.getAllVehiculos);

router.get("/:id", controller.getVehiculo);

router.post("/", controller.createVehiculo);

router.put("/:id", controller.updateVehiculo);

router.delete("/:id", controller.deleteVehiculo);

module.exports = router;
