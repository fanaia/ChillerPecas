const Template = require("../models/template");

class templateController {
  static async create(req, res) {
    const updateData = req.body;
    if (!updateData.nome || updateData.nome == "") return res.status(400).send("Nome is required");

    const template = new Template(updateData);
    await template.save();
    res.status(201).send(template);
  }

  static async readAll(req, res) {
    const templates = await Template.find(req.query);
    res.send(templates);
  }

  static async readOne(req, res) {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).send("Template not found");
    }
    res.send(template);
  }

  static async update(req, res) {
    const updateData = req.body;
    if (updateData.nome == "") return res.status(400).send("Nome is required");

    const template = await Template.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!template) {
      return res.status(404).send("Template not found");
    }
    res.send(template);
  }

  static async delete(req, res) {
    const template = await Template.findByIdAndDelete(req.params.id);
    if (!template) {
      return res.status(404).send("Template not found");
    }
    res.status(204).send();
  }
}

module.exports = templateController;
