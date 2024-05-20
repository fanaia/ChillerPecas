const Include = require("../models/include");

class includesController {
  static async create(req, res) {
    const updateData = req.body;
    if (!updateData.nome || updateData.nome == "") return res.status(400).send("Nome is required");

    const include = new Include(updateData);
    await include.save();
    res.status(201).send(include);
  }

  static async readAll(req, res) {
    const includes = await Include.find(req.query);
    res.send(includes);
  }

  static async readOne(req, res) {
    const include = await Include.findById(req.params.id);
    if (!include) {
      return res.status(404).send("Include not found");
    }
    res.send(include);
  }

  static async update(req, res) {
    const updateData = req.body;
    if (updateData.nome == "") return res.status(400).send("Nome is required");

    const include = await Include.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!include) {
      return res.status(404).send("Include not found");
    }
    res.send(include);
  }

  static async delete(req, res) {
    const include = await Include.findByIdAndDelete(req.params.id);
    if (!include) {
      return res.status(404).send("Include not found");
    }
    res.status(204).send();
  }
}

module.exports = includesController;
