const express = require("express");
const templatesController = require("../controllers/templatesController");

const router = express.Router();
router.post("/", templatesController.create);
router.get("/", templatesController.readAll);
router.get("/:id", templatesController.readOne);
router.patch("/:id", templatesController.update);
router.delete("/:id", templatesController.delete);

module.exports = router;
