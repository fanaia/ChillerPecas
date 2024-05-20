const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const Usuario = require("../models/usuario");

class IndexController {
  static async test(req, res) {
    res.send({ message: "Test route is working" });
  }

  static async login(req, res) {
    const { email, senha } = req.body;
    const hashedPassword = CryptoJS.SHA256(senha).toString();
    const usuario = await Usuario.findOne({ email, senha: hashedPassword });

    if (!usuario) return res.status(401).send({ message: "Invalid credentials" });
    if (!usuario.ativo) return res.status(401).send({ message: "Account is not active" });

    const token = jwt.sign(
      { _id: usuario._id, email: usuario.email, senha: usuario.senha },
      process.env.ACCESS_TOKEN_SECRET
    );
    usuario.jwt = token;
    await usuario.save();
    res.send({ token });
  }
}

module.exports = IndexController;
