const mongoose = require("mongoose");

const EmpresaSchema = new mongoose.Schema({
  nome: String,
  cnpj: String,
  ativo: Boolean,
  authOmie: {
    appKey: String,
    appSecret: String,
    appHash: String,
  },
  endereco: {
    logradouro: String,
    numero: String,
    complemento: String,
    bairro: String,
    cidade: String,
    estado: String,
    cep: String,
  },
  adiantamento: {
    categoria: String,
    contaCorrente: Number,
  },
  dadosPagamento: {
    tipo: String,
    banco: String,
    agencia: String,
    conta: String,
    swift: String,
    iban: String,
    pix: String,
  },
});

const Empresa = mongoose.models.Empresa || mongoose.model("Empresa", EmpresaSchema, "empresas");

module.exports = Empresa;
