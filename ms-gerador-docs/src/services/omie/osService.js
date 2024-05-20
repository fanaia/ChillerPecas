const { apiOmie } = require("../../config/apiOmie");

const osService = {
  listarOS: async (omieAuth) => {
    const body = {
      call: "ListarOS",
      app_key: omieAuth.appKey,
      app_secret: omieAuth.appSecret,
      param: [{ filtrar_por_etapa: "30" }],
    };

    try {
      const response = await apiOmie.post("servicos/os/", body);
      return response.data.osCadastro;
    } catch (error) {
      if (error.code === 'ETIMEDOUT' || error.code === 'ENETUNREACH') {
        throw error.code;
      } else if (
        error.response &&
        error.response.status === 500 &&
        error.response.data.faultstring === "ERROR: Não existem registros para a página [1]!"
      ) {
        return [];
      } else {
        console.error("erro ao listar OSs");
        throw error;
      }
    }
  },

  consultarOS: async (omieAuth, codOs) => {
    const body = {
      call: "ConsultarOS",
      app_key: omieAuth.appKey,
      app_secret: omieAuth.appSecret,
      param: [{ nCodOS: codOs }],
    };

    const response = await apiOmie.post("servicos/os/", body);
    return response.data;
  },

  trocarEtapaOS: async (omieAuth, codOs, etapa, observacao) => {
    const os = await osService.consultarOS(omieAuth, codOs);
    const novaObs = os.Observacoes.observacao
      ? observacao + "/n" + os.Observacoes.observacao
      : observacao;

    const novaOs = {
      Cabecalho: {
        nCodOS: codOs,
        cEtapa: etapa,
      },
      Observacoes: { cObsOS: novaObs },
    };
    return await osService.alterarOS(omieAuth, novaOs);
  },

  alterarOS: async (omieAuth, os) => {
    const body = {
      call: "AlterarOS",
      app_key: omieAuth.appKey,
      app_secret: omieAuth.appSecret,
      param: [os],
    };

    const response = await apiOmie.post("servicos/os/", body);
    return response.data;
  },

  montarOsAlterada: async (
    omieAuth,
    codOs,
    etapa,
    anteciparParcelas,
    categoriaAdiantamento,
    contaCorrenteAdiantamento,
    observacoes
  ) => {
    const os = await osService.consultarOS(omieAuth, codOs);
    const novaOs = {
      Cabecalho: {
        nCodOS: codOs,
        dDtPrevisao: os.Cabecalho.dDtPrevisao,
        cCodParc: "999",
      },
      Observacoes: {
        cObsOS: `${observacoes}\n${os.Observacoes.cObsOS}`,
      },
    };

    if (etapa) novaOs.Cabecalho.cEtapa = etapa;
    if (anteciparParcelas) {
      novaOs.Parcelas = os.Parcelas.map((parcela) => ({
        ...parcela,
        parcela_adiantamento: "S",
        categoria_adiantamento: categoriaAdiantamento,
        conta_corrente_adiantamento: contaCorrenteAdiantamento,
      }));
    }
    return novaOs;
  },
};

module.exports = osService;
