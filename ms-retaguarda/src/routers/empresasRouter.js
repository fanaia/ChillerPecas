const express = require("express");
const empresasController = require("../controllers/empresasController");

const router = express.Router();
router.post("/", empresasController.create);
router.get("/", empresasController.readAll);
router.get("/:id", empresasController.readOne);
router.patch("/:id", empresasController.update);
router.delete("/:id", empresasController.delete);

module.exports = router;
