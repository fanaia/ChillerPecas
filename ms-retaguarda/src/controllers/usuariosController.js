const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

class usuarioController {
  static async create(req, res) {
    const updateData = req.body;

    if (!updateData.nome || updateData.nome == "") return res.status(400).send("Nome is required");
    if (!updateData.senha || updateData.senha == "") return res.status(400).send("Senha is required");

    if (updateData.senha) {
      const hashedPassword = updateData.senha ? CryptoJS.SHA256(updateData.senha).toString() : null;
      updateData.senha = hashedPassword;
    }

    const usuario = new Usuario(updateData);
    await usuario.save();
    res.status(201).send(usuario);
  }

  static async readAll(req, res) {
    const usuarios = await Usuario.find(req.query);
    res.send(usuarios);
  }

  static async readOne(req, res) {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).send("User not found");
    }
    res.send(usuario);
  }

  static async update(req, res) {
    const updateData = req.body;

    if (updateData.nome == "") return res.status(400).send("Nome is required");
    
    if (updateData.senha && updateData.senha.trim() !== "") {
      const hashedPassword = CryptoJS.SHA256(updateData.senha).toString();
      updateData.senha = hashedPassword;
    } else {
      delete updateData.senha;
    }

    const usuario = await Usuario.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!usuario) {
      return res.status(404).send("Usuario not found");
    }
    res.send(usuario);
  }

  static async delete(req, res) {
    await Usuario.deleteOne({ _id: req.params.id });
    res.send("User deleted");
  }
}

module.exports = usuarioController;
