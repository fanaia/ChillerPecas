import apiRetaguarda from "../config/apiRetaguarda";

const listIncludes = async () => {
  const response = await apiRetaguarda.get("/includes");
  return response.data;
};

const loadInclude = async (_id) => {
  const response = await apiRetaguarda.get(`/includes/${_id}`);
  return response.data;
};

const saveInclude = async (include) => {
  try {
    if (include._id) {
      await apiRetaguarda.patch(`/includes/${include._id}`, include);
      return { success: true, message: "Alterado com sucesso!" };
    } else {
      await apiRetaguarda.post("/includes", include);
      return { success: true, message: "Adicionado com sucesso!" };
    }
  } catch (error) {
    return { success: false, message: error.response.data };
  }
};

const deleteInclude = async (_id) => {
  try {
    await apiRetaguarda.delete(`/includes/${_id}`);
    return { success: true, message: "Excluído com sucesso!" };
  } catch (error) {
    return { success: false, message: error.response.data };
  }
};

const includeService = {
  listIncludes,
  loadInclude,
  saveInclude,
  deleteInclude,
};
export default includeService;
