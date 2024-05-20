import apiRetaguarda from "../config/apiRetaguarda";

const listUsuarios = async () => {
  const response = await apiRetaguarda.get("/usuarios");
  return response.data;
};

const loadUsuario = async (_id) => {
  const response = await apiRetaguarda.get(`/usuarios/${_id}`);
  return response.data;
};

const saveUsuario = async (usuario) => {
  try {
    if (usuario._id) {
      await apiRetaguarda.patch(`/usuarios/${usuario._id}`, usuario);
      return { success: true, message: "Alterado com sucesso!" };
    } else {
      await apiRetaguarda.post("/usuarios", usuario);
      return { success: true, message: "Adicionado com sucesso!" };
    }
  } catch (error) {
    return { success: false, message: error.response.data };
  }
};

const deleteUsuario = async (_id) => {
  try {
    await apiRetaguarda.delete(`/usuarios/${_id}`);
    return { success: true, message: "Excluído com sucesso!" };
  } catch (error) {
    return { success: false, message: error.response.data };
  }
};

const setAtivo = async (_id, ativo) => {
  const response = await apiRetaguarda.patch(`/usuarios/${_id}`, { ativo });
  return response.data;
};

const setNotificarFalha = async (_id, notificarFalha) => {
  const response = await apiRetaguarda.patch(`/usuarios/${_id}`, { notificarFalha });
  return response.data;
};

const usuarioService = {
  listUsuarios,
  loadUsuario,
  saveUsuario,
  deleteUsuario,
  setAtivo,
  setNotificarFalha,
};
export default usuarioService;
