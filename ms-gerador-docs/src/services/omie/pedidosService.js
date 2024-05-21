const { apiOmie } = require("../../config/apiOmie");

const pedidosService = {
  listar: async (omieAuth) => {
    const body = {
      call: "ListarPedidos",
      app_key: omieAuth.appKey,
      app_secret: omieAuth.appSecret,
      param: [{ etapa: process.env.OMIE_ETAPA_GERAR_DOC }],
    };

    try {
      const response = await apiOmie.post("produtos/pedido/", body);
      return response.data.pedido_venda_produto;
    } catch (error) {
      if (error.code === "ETIMEDOUT" || error.code === "ENETUNREACH") {
        throw error.code;
      } else if (
        error.response &&
        error.response.status === 500 &&
        error.response.data.faultstring.includes("Não existem registros para a página")
      ) {
        return [];
      } else {
        throw "Erro ao listar Pedidos: " + error.response.data;
      }
    }
  },

  consultar: async (omieAuth, codigoPedido) => {
    try {
      const body = {
        call: "ConsultarPedido",
        app_key: omieAuth.appKey,
        app_secret: omieAuth.appSecret,
        param: [{ codigo_pedido: codigoPedido }],
      };

      const response = await apiOmie.post("produtos/pedido/", body);
      return response.data;
    } catch (error) {
      if (error.response)
        throw "Erro ao consultar pedido: " + JSON.stringify(error.response.data, null, 2);
      else throw "Erro ao consultar pedido: " + error;
    }
  },

  trocarEtapa: async (omieAuth, codigoPedido, etapa) => {
    try {
      const body = {
        call: "TrocarEtapaPedido",
        app_key: omieAuth.appKey,
        app_secret: omieAuth.appSecret,
        param: [
          {
            codigo_pedido: codigoPedido,
            etapa: etapa,
          },
        ],
      };

      const response = await apiOmie.post("produtos/pedido/", body);
      return response.data;
    } catch (error) {
      throw "Erro ao trocar etapa do pedido: " + error;
    }
  },

  alterar: async (omieAuth, pedido) => {
    try {
      const body = {
        call: "AlterarPedidoVenda",
        app_key: omieAuth.appKey,
        app_secret: omieAuth.appSecret,
        param: [pedido],
      };

      const response = await apiOmie.post("produtos/pedido/", body);
      return response.data;
    } catch (error) {
      throw "Erro ao alterar pedido: " + error;
    }
  },
};

module.exports = pedidosService;
