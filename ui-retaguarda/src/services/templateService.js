import apiRetaguarda from "../config/apiRetaguarda";

const listTemplates = async () => {
  const response = await apiRetaguarda.get("/templates");
  return response.data;
};

const loadTemplate = async (_id) => {
  const response = await apiRetaguarda.get(`/templates/${_id}`);
  return response.data;
};

const saveTemplate = async (template) => {
  try {
    if (template._id) {
      await apiRetaguarda.patch(`/templates/${template._id}`, template);
      return { success: true, message: "Alterado com sucesso!" };
    } else {
      await apiRetaguarda.post("/templates", template);
      return { success: true, message: "Adicionado com sucesso!" };
    }
  } catch (error) {
    return { success: false, message: error.response.data };
  }
};

const deleteTemplate = async (_id) => {
  try {
    await apiRetaguarda.delete(`/templates/${_id}`);
    return { success: true, message: "Excluído com sucesso!" };
  } catch (error) {
    return { success: false, message: error.response.data };
  }
};

const templateService = {
  listTemplates,
  loadTemplate,
  saveTemplate,
  deleteTemplate,
};
export default templateService;
