const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).json({ error: "Token não fornecido" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido" });

    // console.log(`User: ${JSON.stringify(user)}`);
    const { _id, email, senha } = user;
    const usuario = await Usuario.findOne({ _id });

    if (!usuario) return res.status(403).json({ error: "Usuário não encontrado" });
    if (usuario.email !== email || usuario.senha !== senha)
      return res.status(403).json({ error: "Autenticação inválida" });
    if (!usuario.ativo) return res.status(403).json({ error: "Usuário desativado" });

    req.user = usuario;
    next();
  });
};

module.exports = authMiddleware;
