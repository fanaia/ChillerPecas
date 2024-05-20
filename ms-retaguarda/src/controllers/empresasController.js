const Empresa = require("../models/empresa");

class empresaController {
  static async create(req, res) {
    const updateData = req.body;
    if (!updateData.nome || updateData.nome == "") return res.status(400).send("Nome is required");

    const empresa = new Empresa(updateData);
    await empresa.save();
    res.status(201).send(empresa);
  }

  static async readAll(req, res) {
    const empresas = await Empresa.find(req.query);
    res.send(empresas);
  }

  static async readOne(req, res) {
    const empresa = await Empresa.findById(req.params.id);
    if (!empresa) {
      return res.status(404).send("Empresa not found");
    }
    res.send(empresa);
  }

  static async update(req, res) {
    const updateData = req.body;
    if (updateData.nome == "") return res.status(400).send("Nome is required");

    const empresa = await Empresa.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!empresa) {
      return res.status(404).send("Empresa not found");
    }
    res.send(empresa);
  }

  static async delete(req, res) {
    const empresa = await Empresa.findByIdAndDelete(req.params.id);
    if (!empresa) {
      return res.status(404).send("Empresa not found");
    }
    res.status(204).send();
  }
}

module.exports = empresaController;
