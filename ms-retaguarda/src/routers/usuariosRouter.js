const express = require("express");
const usuarioController = require("../controllers/usuariosController");

const router = express.Router();
router.post("/", usuarioController.create);
router.get("/", usuarioController.readAll);
router.get("/:id", usuarioController.readOne);
router.patch("/:id", usuarioController.update);
router.delete("/:id", usuarioController.delete);

module.exports = router;
