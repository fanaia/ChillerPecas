const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  notificarFalha: Boolean,
  ativo: Boolean,
});

const Usuario = mongoose.models.Usuario || mongoose.model("Usuario", UsuarioSchema, "usuarios");

module.exports = Usuario;