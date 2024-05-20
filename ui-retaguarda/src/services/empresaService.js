import apiRetaguarda from "../config/apiRetaguarda";

const listEmpresas = async () => {
  const response = await apiRetaguarda.get("/empresas");
  return response.data;
};

const loadEmpresa = async (_id) => {
  const response = await apiRetaguarda.get(`/empresas/${_id}`);
  return response.data;
};

const saveEmpresa = async (empresa) => {
  try {
    if (empresa._id) {
      await apiRetaguarda.patch(`/empresas/${empresa._id}`, empresa);
      return { success: true, message: "Alterado com sucesso!" };
    } else {
      await apiRetaguarda.post("/empresas", empresa);
      return { success: true, message: "Adicionado com sucesso!" };
    }
  } catch (error) {
    return { success: false, message: error.response.data };
  }
};

const deleteEmpresa = async (_id) => {
  try {
    await apiRetaguarda.delete(`/empresas/${_id}`);
    return { success: true, message: "Excluído com sucesso!" };
  } catch (error) {
    return { success: false, message: error.response.data };
  }
};

const setAtivo = async (_id, ativo) => {
  const response = await apiRetaguarda.patch(`/empresas/${_id}`, { ativo });
  return response.data;
};

const empresaService = {
  listEmpresas,
  loadEmpresa,
  saveEmpresa,
  deleteEmpresa,
  setAtivo,
};
export default empresaService;
