require("express-async-errors");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");

const connectDB = require("./config/db");
const logger = require("./config/logger");
const authMiddleware = require("./middlewares/authMiddleware");

const indexRouter = require("./routers/indexRouter");
const usuariosRouter = require("./routers/usuariosRouter");
const empresasRouter = require("./routers/empresasRouter");
const templatesRouter = require("./routers/templatesRouter");
const includesRouter = require("./routers/includesRouter");

let server = null;

const start = async () => {
  connectDB();
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "public")));

  app.use("/api", indexRouter);
  app.use("/api/usuarios", authMiddleware, usuariosRouter);
  app.use("/api/empresas", authMiddleware, empresasRouter);
  app.use("/api/templates", authMiddleware, templatesRouter);
  app.use("/api/includes", authMiddleware, includesRouter);

  app.use((error, req, res, next) => {
    logger.error(`${error.stack}`);
    res.status(500).send("Erro interno no servidor");
  });

  server = app.listen(process.env.PORT, () => {
    console.log(`Serviço ${process.env.SERVICE_NAME} subiu na porta ${process.env.PORT}`);
  });

  return server;
};

const stop = async () => {
  if (server) await server.close();
  return true;
};

module.exports = { start, stop };
