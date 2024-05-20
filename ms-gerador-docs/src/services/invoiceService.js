const ejs = require("ejs");
const logger = require("../config/logger");
const { generatePDF } = require("../components/pdfGenerator");
const { sendEmail } = require("../components/emailSender");
const osService = require("./omie/osService");
const clienteService = require("./omie/clienteService");
const anexoService = require("./omie/anexoService");
const paisesService = require("./omie/paisesService");
const { apiRetaguarda } = require("../config/apiRetaguarda");

const invoiceService = {
  gerarInvoice: async (authOmie, idOrdemServico) => {
    try {
      const [resEmpresa, resIncludes, resTemplates, resMoedas] = await Promise.all([
        apiRetaguarda.get(`empresas?authOmie.appKey=${authOmie.appKey}`),
        apiRetaguarda.get(`includes`),
        apiRetaguarda.get(`templates`),
        apiRetaguarda.get(`moedas`),
      ]);

      const empresa = resEmpresa.data[0];
      const includes = resIncludes.data;

      const templates = resTemplates.data;
      const invoice = templates.find((template) => template.nome === "invoice").templateEjs;
      const emailAssunto = templates.find(
        (template) => template.nome === "email-assunto"
      ).templateEjs;
      const emailCorpo = templates.find((template) => template.nome === "email-corpo").templateEjs;

      const moedas = resMoedas.data;
      const moedaUSD = moedas.find((moeda) => moeda.simbolo === "USD");
      const moedaEUR = moedas.find((moeda) => moeda.simbolo === "EUR");

      const os = await osService.consultarOS(authOmie, idOrdemServico);
      const cliente = await clienteService.consultarCliente(authOmie, os.Cabecalho.nCodCli);
      const paises = await paisesService.consultarPais(authOmie, cliente.codigo_pais);
      cliente.pais = paises.lista_paises[0].cDescricao;

      const variaveisTemplates = { empresa, includes, cliente, os, moedaUSD, moedaEUR };
      const pdfBuffer = await invoiceService.gerarPDFInvoice(invoice, variaveisTemplates);
      const renderedAssunto = ejs.render(emailAssunto, variaveisTemplates);
      const renderedCorpo = ejs.render(emailCorpo, variaveisTemplates);

      await anexoService.incluirAnexoInvoiceOS(authOmie, idOrdemServico, pdfBuffer);

      const observacao = await invoiceService.enviarEmail(
        authOmie,
        idOrdemServico,
        cliente,
        renderedAssunto,
        renderedCorpo
      );

      await invoiceService.processarOS(authOmie, idOrdemServico, empresa, observacao);

      logger.info(`OS ${idOrdemServico} processada!`);
    } catch (error) {
      logger.error(`Erro processamento OS ${idOrdemServico}: ${error}`);
      await osService.trocarEtapaOS(authOmie, idOrdemServico, "10", `${error}`);
    }
  },

  processarOS: async (authOmie, idOrdemServico, empresa, observacao) => {
    const novaOs = await osService.montarOsAlterada(
      authOmie,
      idOrdemServico,
      50,
      true,
      empresa.adiantamento.categoria,
      empresa.adiantamento.contaCorrente,
      observacao
    );
    await osService.alterarOS(authOmie, novaOs);
  },

  enviarEmail: async (authOmie, idOrdemServico, cliente, renderedAssunto, renderedCorpo) => {
    //TODO: Remover essa linha depois dos testes
    // cliente.email = "faturamento@europartner.com.br";
    // cliente.email = "analuiza.andrade@europartner.com.br";
    cliente.email = "fabio@pdvseven.com.br, analuiza.andrade@europartner.com.br";

    let observacao = "";
    if (cliente.email) {
      const anexos = await anexoService.listarAnexoBuffer(authOmie, idOrdemServico);
      const info = await sendEmail(cliente.email, renderedAssunto, renderedCorpo, anexos);

      observacao = `Invoice enviada para ${cliente.email} as ${new Date().toLocaleString()}`;
    } else {
      observacao = "E-mail do cliente não cadastrado";
    }

    return observacao;
  },

  gerarPDFInvoice: async (template, variaveis) => {
    const renderedHtml = ejs.render(template, variaveis);
    return await generatePDF(renderedHtml);
  },
};

module.exports = invoiceService;
