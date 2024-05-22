const ejs = require("ejs");
const logger = require("../config/logger");
const { generatePDF } = require("../components/pdfGenerator");
// const { sendEmail } = require("../components/emailSender");
// const osService = require("./omie/osService");
const clienteService = require("./omie/clienteService");
const anexoService = require("./omie/anexoService");
const { apiRetaguarda } = require("../config/apiRetaguarda");
const pedidosService = require("./omie/pedidosService");

const geradorDocsService = {
  gerarDoc: async (authOmie, codigoPedido) => {
    try {
      const [resEmpresa, resTemplates, resIncludes] = await Promise.all([
        apiRetaguarda.get(`empresas?authOmie.appKey=${authOmie.appKey}`),
        apiRetaguarda.get(`templates`),
        apiRetaguarda.get(`includes`),
      ]);

      const empresa = resEmpresa.data[0];
      const includes = resIncludes.data;

      const templates = resTemplates.data;
      const templatePedido = templates.find(
        (template) => template.nome === "pedido-venda"
      ).templateEjs;

      // const templateEmailAssunto = templates.find(
      //   (template) => template.nome === "email-assunto"
      // ).templateEjs;
      // const templateEmailCorpo = templates.find((template) => template.nome === "email-corpo").templateEjs;

      let pedido = await pedidosService.consultar(authOmie, codigoPedido);
      pedido = pedido.pedido_venda_produto;

      const cliente = await clienteService.consultarCliente(
        authOmie,
        pedido.cabecalho.codigo_cliente
      );

      const variaveisTemplates = { empresa, includes, cliente, pedido };
      const pdfBuffer = await geradorDocsService.gerarPDF(templatePedido, variaveisTemplates);
      // const renderedAssunto = ejs.render(templateEmailAssunto, variaveisTemplates);
      // const renderedCorpo = ejs.render(templateEmailCorpo, variaveisTemplates);

      await geradorDocsService.incluirAnexo(
        authOmie,
        codigoPedido,
        pedido.cabecalho.numero_pedido,
        pdfBuffer
      );
      // console.log(`Anexo incluído no pedido ${codigoPedido}`);

      // const observacao = await geradorDocsService.enviarEmail(
      //   authOmie,
      //   codigoPedido,
      //   cliente,
      //   renderedAssunto,
      //   renderedCorpo
      // );

      // await new Promise((resolve) => setTimeout(resolve, 1000));
      await pedidosService.trocarEtapa(
        authOmie,
        codigoPedido,
        process.env.OMIE_ETAPA_PROCESSADO,
        ""
      );

      logger.info(`Pedido ${codigoPedido} (No ${pedido.cabecalho.numero_pedido}) processado!`);
    } catch (error) {
      console.log(error);

      logger.error(`Erro processamento pedido ${codigoPedido}: ${error}`);
      await pedidosService.trocarEtapa(
        authOmie,
        codigoPedido,
        process.env.OMIE_ETAPA_FALHA_PROCESSAMENTO,
        `${error}`
      );
    }
  },

  // enviarEmail: async (authOmie, codigoPedido, cliente, renderedAssunto, renderedCorpo) => {
  //   //TODO: Remover essa linha depois dos testes
  //   // cliente.email = "faturamento@europartner.com.br";
  //   // cliente.email = "analuiza.andrade@europartner.com.br";
  //   cliente.email = "fabio@pdvseven.com.br, analuiza.andrade@europartner.com.br";

  //   let observacao = "";
  //   if (cliente.email) {
  //     const anexos = await anexoService.listarAnexoBuffer(authOmie, idOrdemServico);
  //     const info = await sendEmail(cliente.email, renderedAssunto, renderedCorpo, anexos);

  //     observacao = `Invoice enviada para ${cliente.email} as ${new Date().toLocaleString()}`;
  //   } else {
  //     observacao = "E-mail do cliente não cadastrado";
  //   }

  //   return observacao;
  // },

  gerarPDF: async (template, variaveis) => {
    const renderedHtml = ejs.render(template, variaveis);
    return await generatePDF(renderedHtml);
  },

  incluirAnexo: async (omieAuth, codigoPedido, numeroPedido, arquivo) => {
    let date = new Date();
    let formattedDate = `${date.getFullYear()}${("0" + (date.getMonth() + 1)).slice(-2)}${(
      "0" + date.getDate()
    ).slice(-2)}${("0" + date.getHours()).slice(-2)}${("0" + date.getMinutes()).slice(-2)}${(
      "0" + date.getSeconds()
    ).slice(-2)}`;

    return await anexoService.incluirAnexo(
      omieAuth,
      "pedido-venda",
      codigoPedido,
      `pedido-${numeroPedido}-${formattedDate}.pdf`,
      "pdf",
      arquivo
    );
  },
};

module.exports = geradorDocsService;
