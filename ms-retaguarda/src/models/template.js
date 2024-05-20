const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  templateEjs: String,
});

const Template =
  mongoose.models.Template || mongoose.model("Template", TemplateSchema, "templates");

module.exports = Template;
