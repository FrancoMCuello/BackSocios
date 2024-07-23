const express = require("express");
const router = express.Router();
const controller = require("../controllers/registro.controller");

router.get("/", controller.getAllRegistros);

router.get("/:id", controller.getRegistro);

router.post("/", controller.createRegistro);

router.put("/:id", controller.updateRegistro);

router.delete("/:id", controller.deleteRegistro);

module.exports = router;
