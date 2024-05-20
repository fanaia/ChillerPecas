const mongoose = require("mongoose");

const IncludeSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  conteudo: String,
});

const Include = mongoose.models.Include || mongoose.model("Include", IncludeSchema, "includes");

module.exports = Include;
