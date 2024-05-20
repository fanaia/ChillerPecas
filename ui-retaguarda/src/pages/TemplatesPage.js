import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, ButtonGroup } from "react-bootstrap";
import templateService from "../services/templateService";
import TemplateEdit from "../components/TemplateEdit";

const TemplatesPage = () => {
  const [msg, setMsg] = useState();
  const [templates, setTemplates] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [templateIdToDelete, setTemplateIdToDelete] = useState(null);

  const templateEditRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    templateService.listTemplates().then((data) => setTemplates(data.map((item) => ({ ...item }))));
  };

  const handleEdit = (_id) => {
    setSelectedId(_id);
    setShowModal(true);
  };

  const askForDeleteConfirmation = (_id) => {
    setTemplateIdToDelete(_id);
    setShowModal(false);
    setShowConfirmModal(true);
  };

  const handleDelete = () => {
    templateService.deleteTemplate(templateIdToDelete).then((response) => {
      setShowModal(false);
      setMsg(response);
      fetchData();
    });
    setShowConfirmModal(false);
  };

  const handleAdd = () => {
    setSelectedId(null);
    setShowModal(true);
  };

  const handleSave = async () => {
    const ret = await templateEditRef.current.save();
    setShowModal(false);
    fetchData();
    setMsg(ret);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="container">
        {msg && (
          <div className={`alert alert-${msg.success ? "info" : "danger"}`} role="alert">
            {JSON.stringify(msg.message)}
          </div>
        )}
        <h1 className="my-4">Templates</h1>
        <Button onClick={handleAdd} className="btn btn-primary mb-3">
          Adicionar Template
        </Button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th className="d-none d-md-table-cell">Descrição</th>
              <th className="d-none d-md-table-cell"></th>
            </tr>
          </thead>
          <tbody>
            {templates.map((template) => (
              <tr key={template._id}>
                <td>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => handleEdit(template._id)}
                  >
                    {template.nome}
                  </button>
                </td>
                <td className="d-none d-md-table-cell">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => handleEdit(template._id)}
                  >
                    {template.descricao}
                  </button>
                </td>
                <td className="d-none d-md-table-cell">
                  <Button variant="danger" onClick={() => askForDeleteConfirmation(template._id)}>
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onHide={handleClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title>{selectedId > 0 ? "Alterar Template" : "Adicionar Template"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}>
          <TemplateEdit ref={templateEditRef} _id={selectedId} />
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup>
            <Button variant="primary" onClick={handleSave}>
              Salvar
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
          </ButtonGroup>
          <Button
            variant="danger"
            onClick={() => askForDeleteConfirmation(selectedId)}
            style={{ marginLeft: "auto" }}
            disabled={!selectedId}
          >
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação de exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir este Template?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TemplatesPage;
