import React, { useEffect, useRef, useState } from "react";
import { Form, Modal, Button, ButtonGroup } from "react-bootstrap";
import empresaService from "../services/empresaService";
import EmpresaEdit from "../components/EmpresaEdit";

const EmpresasPage = () => {
  const [msg, setMsg] = useState();
  const [empresa, setEmpresas] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [empresaIdToDelete, setEmpresaIdToDelete] = useState(null);

  const empresaEditRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    empresaService.listEmpresas().then((data) => setEmpresas(data.map((item) => ({ ...item }))));
  };

  const toggleAtivo = async (_id, value) => {
    await empresaService.setAtivo(_id, value);
    fetchData();
  };

  const handleEdit = (_id) => {
    setSelectedId(_id);
    setShowModal(true);
  };

  const askForDeleteConfirmation = (_id) => {
    setEmpresaIdToDelete(_id);
    setShowModal(false);
    setShowConfirmModal(true);
  };

  const handleDelete = () => {
    empresaService.deleteEmpresa(empresaIdToDelete).then((response) => {
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
    const ret = await empresaEditRef.current.save();
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
        <h1 className="my-4">Empresas</h1>
        <Button onClick={handleAdd} className="btn btn-primary mb-3">
          Adicionar Empresa
        </Button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th className="d-none d-md-table-cell">Ativo</th>
              <th className="d-none d-md-table-cell"></th>
            </tr>
          </thead>
          <tbody>
            {empresa.map((empresa) => (
              <tr key={empresa._id}>
                <td>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => handleEdit(empresa._id)}
                  >
                    {empresa.nome}
                  </button>
                </td>
                <td className="d-none d-md-table-cell">
                  <Form.Check
                    type="switch"
                    id={`ativo-${empresa._id}`}
                    checked={empresa.ativo}
                    onChange={() => toggleAtivo(empresa._id, !empresa.ativo)}
                  />
                </td>
                <td className="d-none d-md-table-cell">
                  <Button variant="danger" onClick={() => askForDeleteConfirmation(empresa._id)}>
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{selectedId > 0 ? "Alterar Empresa" : "Adicionar Empresa"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}>
          <EmpresaEdit ref={empresaEditRef} _id={selectedId} />
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
        <Modal.Body>Tem certeza que deseja excluir esta Empresa?</Modal.Body>
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

export default EmpresasPage;
