import apiRetaguarda from "../config/apiRetaguarda";

const loadMoeda = async (simbolo) => {
  const response = await apiRetaguarda.get(`/moedas?simbolo=${simbolo}`);
  return response.data[0];
};

const updateTipoCotacao = async (_id, tipoCotacao) => {
  const body = { "tipoCotacao": tipoCotacao };
  console.log(`body: ${JSON.stringify(body)}`)
  const response = await apiRetaguarda.patch(`/moedas/${_id}`, body);
  return response.data;
};

const updateValor = async (_id, valor) => {
  const body = { "valor": valor };
  console.log(`body: ${JSON.stringify(body)}`)
  const response = await apiRetaguarda.patch(`/moedas/${_id}`, body);
  return response.data;
};

export { loadMoeda, updateTipoCotacao, updateValor };
