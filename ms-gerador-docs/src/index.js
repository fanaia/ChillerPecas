const { apiRetaguarda } = require("./config/apiRetaguarda");
const logger = require("./config/logger");
const geradorDocsService = require("./services/geradorDocsService");
const pedidosService = require("./services/omie/pedidosService");

const checkPedidos = async (empresa) => {
  try {
    // console.log(`Verificando Pedidos da empresa ${empresa.nome}...`);
    const pedidos = await pedidosService.listar(empresa.authOmie);
    // console.log(pedidos);
    // console.log(`Total de Pedidos encontrados da empresa ${empresa.nome}: ${pedidos.length}`);

    for (const pedido of pedidos) {
      // logger.info(`Processando Pedido ${pedido.cabecalho.codigo_pedido}...`);
      await geradorDocsService.gerarDoc(empresa.authOmie, pedido.cabecalho.codigo_pedido);
    }
  } catch (error) {
    logger.error(`Erro checkPedidos: ${error}`);
  } finally {
    // console.log(`Verificação de Pedidos da empresa ${empresa.nome} finalizada.`);
    setTimeout(() => checkPedidos(empresa), 60 * 1000);
  }
};

const app = async () => {
  console.log("Iniciando ms-gerador-docs...");

  try {
    const resEmpresas = await apiRetaguarda.get(`empresas?ativo=true`);
    const empresas = resEmpresas.data;

    for (const empresa of empresas) {
      checkPedidos(empresa);
    }
  } catch (error) {
    console.error(error);
  }
};

app();
