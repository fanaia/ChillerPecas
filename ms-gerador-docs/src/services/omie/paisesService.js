const { apiOmie } = require("../../config/apiOmie");

const paisesService = {
  consultarPais: async (omieAuth, codPais) => {
    if (codPais == 1058)
      return {
        lista_paises: [
          {
            cCodigo: "1058",
            cCodigoISO: "BR",
            cDescricao: "Brasil",
          },
        ],
      };

    const body = {
      call: "ListarPaises",
      app_key: omieAuth.appKey,
      app_secret: omieAuth.appSecret,
      param: [{ filtrar_por_codigo: codPais }],
    };

    const response = await apiOmie.post("geral/paises/", body);
    return response.data;
  },
};

module.exports = paisesService;
