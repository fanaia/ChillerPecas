import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, ButtonGroup } from "react-bootstrap";
import includeService from "../services/includeService";
import IncludeEdit from "../components/IncludeEdit";

const IncludesPage = () => {
  const [msg, setMsg] = useState();
  const [includes, setIncludes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [includeIdToDelete, setIncludeIdToDelete] = useState(null);

  const includeEditRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    includeService.listIncludes().then((data) => setIncludes(data.map((item) => ({ ...item }))));
  };

  const handleEdit = (_id) => {
    setSelectedId(_id);
    setShowModal(true);
  };

  const askForDeleteConfirmation = (_id) => {
    setIncludeIdToDelete(_id);
    setShowModal(false);
    setShowConfirmModal(true);
  };

  const handleDelete = () => {
    includeService.deleteInclude(includeIdToDelete).then((response) => {
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
    const ret = await includeEditRef.current.save();
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
        <h1 className="my-4">Includes</h1>
        <Button onClick={handleAdd} className="btn btn-primary mb-3">
          Adicionar Include
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
            {includes.map((include) => (
              <tr key={include._id}>
                <td>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => handleEdit(include._id)}
                  >
                    {include.nome}
                  </button>
                </td>
                <td className="d-none d-md-table-cell">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => handleEdit(include._id)}
                  >
                    {include.descricao}
                  </button>
                </td>
                <td className="d-none d-md-table-cell">
                  <Button variant="danger" onClick={() => askForDeleteConfirmation(include._id)}>
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
          <Modal.Title>{selectedId > 0 ? "Alterar Include" : "Adicionar Include"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}>
          <IncludeEdit ref={includeEditRef} _id={selectedId} />
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
        <Modal.Body>Tem certeza que deseja excluir este Include?</Modal.Body>
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

export default IncludesPage;
