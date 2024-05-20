const fetch = require("node-fetch");
const { compactFile } = require("../../components/fileHandler");
const { apiOmie } = require("../../config/apiOmie");

const anexoService = {
  incluirAnexoInvoiceOS: async (omieAuth, codOs, arquivo) => {
    return await anexoService.incluirAnexo(
      omieAuth,
      "ordem-servico",
      codOs,
      `invoice-${codOs}.pdf`,
      "pdf",
      arquivo
    );
  },

  incluirAnexo: async (omieAuth, tabela, id, nomeArquivo, tipoArquivo, arquivo) => {
    const arquivoCompactado = await compactFile(arquivo, `invoice-${id}.pdf`);

    const param = {
      cCodIntAnexo: "",
      cTabela: tabela,
      nId: id,
      cNomeArquivo: nomeArquivo,
      cTipoArquivo: tipoArquivo,
      cArquivo: arquivoCompactado.base64File,
      cMd5: arquivoCompactado.md5,
    };

    const body = {
      call: "IncluirAnexo",
      app_key: omieAuth.appKey,
      app_secret: omieAuth.appSecret,
      param: [param],
    };

    const response = await apiOmie.post("geral/anexo/", body);
    return response.data;
  },

  listarAnexo: async (omieAuth, tabela, id) => {
    const param = {
      nPagina: 1,
      nRegPorPagina: 50,
      nId: id,
      cTabela: tabela,
    };

    const body = {
      call: "ListarAnexo",
      app_key: omieAuth.appKey,
      app_secret: omieAuth.appSecret,
      param: [param],
    };

    const response = await apiOmie.post("geral/anexo/", body);
    return response.data;
  },

  obterAnexo: async (omieAuth, cTaebla, nId, nIdAnexo) => {
    const param = {
      cTabela: cTaebla,
      nId: nId,
      nIdAnexo: nIdAnexo,
    };

    const body = {
      call: "ObterAnexo",
      app_key: omieAuth.appKey,
      app_secret: omieAuth.appSecret,
      param: [param],
    };

    const response = await apiOmie.post("geral/anexo/", body);
    return response.data;
  },

  listarAnexoBuffer: async (omieAuth, idOrdemServico) => {
    const anexos = await anexoService.listarAnexo(omieAuth, "ordem-servico", idOrdemServico);
    if (!anexos || !anexos.listaAnexos) return [];

    const listaAnexos = anexos.listaAnexos;

    const listaAnexosBuffer = await Promise.all(
      listaAnexos.map(async (anexo) => {
        const { cNomeArquivo, cLinkDownload } = await anexoService.obterAnexo(
          omieAuth,
          anexo.cTabela,
          anexo.nId,
          anexo.nIdAnexo
        );

        const resposta = await fetch(cLinkDownload);
        const fileBuffer = await resposta.buffer();

        return {
          filename: cNomeArquivo,
          fileBuffer: fileBuffer,
        };
      })
    );

    return listaAnexosBuffer;
  },
};

module.exports = anexoService;
