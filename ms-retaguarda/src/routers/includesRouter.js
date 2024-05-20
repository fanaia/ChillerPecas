const express = require("express");
const includesController = require("../controllers/includesController");

const router = express.Router();
router.post("/", includesController.create);
router.get("/", includesController.readAll);
router.get("/:id", includesController.readOne);
router.patch("/:id", includesController.update);
router.delete("/:id", includesController.delete);

module.exports = router;
