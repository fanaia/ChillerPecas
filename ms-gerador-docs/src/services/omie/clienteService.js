const { apiOmie } = require("../../config/apiOmie");

const clienteService = {
  consultarCliente: async (omieAuth, codCliente) => {
    try {
      const body = {
        call: "ConsultarCliente",
        app_key: omieAuth.appKey,
        app_secret: omieAuth.appSecret,
        param: [{ codigo_cliente_omie: codCliente }],
      };

      const response = await apiOmie.post("geral/clientes/", body);
      return response.data;
    } catch (error) {
      throw "Erro ao consultar cliente: " + error;
    }
  },
};

module.exports = clienteService;
