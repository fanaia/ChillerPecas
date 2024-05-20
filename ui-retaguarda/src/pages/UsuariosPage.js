import React, { useEffect, useRef, useState } from "react";
import { Form, Modal, Button, ButtonGroup } from "react-bootstrap";
import usuarioService from "../services/usuarioService";
import UsuarioEdit from "../components/UsuarioEdit";

const UsuariosPage = () => {
  const [msg, setMsg] = useState();
  const [usuarios, setUsuarios] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [usuarioIdToDelete, setUsuarioIdToDelete] = useState(null);

  const usuarioEditRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    usuarioService.listUsuarios().then((data) => setUsuarios(data.map((item) => ({ ...item }))));
  };

  const toggleNotificarFalha = async (_id, value) => {
    await usuarioService.setNotificarFalha(_id, value);
    fetchData();
  };

  const toggleAtivo = async (_id, value) => {
    await usuarioService.setAtivo(_id, value);
    fetchData();
  };

  const handleEdit = (_id) => {
    setSelectedId(_id);
    setShowModal(true);
  };

  const askForDeleteConfirmation = (_id) => {
    setUsuarioIdToDelete(_id);
    setShowModal(false);
    setShowConfirmModal(true);
  };

  const handleDelete = () => {
    usuarioService.deleteUsuario(usuarioIdToDelete).then((response) => {
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
    const ret = await usuarioEditRef.current.save();
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
        <h1 className="my-4">Usuários</h1>
        <Button onClick={handleAdd} className="btn btn-primary mb-3">
          Adicionar Usuário
        </Button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th className="d-none d-md-table-cell">Email</th>
              <th className="d-none d-md-table-cell">Notificar Falha</th>
              <th className="d-none d-md-table-cell">Ativo</th>
              <th className="d-none d-md-table-cell">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario._id}>
                <td>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => handleEdit(usuario._id)}
                  >
                    {usuario.nome}
                  </button>
                </td>
                <td className="d-none d-md-table-cell">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => handleEdit(usuario._id)}
                  >
                    {usuario.email}
                  </button>
                </td>
                <td className="d-none d-md-table-cell">
                  <Form.Check
                    type="switch"
                    id={`notificarFalha-${usuario._id}`}
                    checked={usuario.notificarFalha}
                    onChange={() => toggleNotificarFalha(usuario._id, !usuario.notificarFalha)}
                  />
                </td>
                <td className="d-none d-md-table-cell">
                  <Form.Check
                    type="switch"
                    id={`ativo-${usuario._id}`}
                    checked={usuario.ativo}
                    onChange={() => toggleAtivo(usuario._id, !usuario.ativo)}
                  />
                </td>
                <td className="d-none d-md-table-cell">
                  <Button variant="danger" onClick={() => askForDeleteConfirmation(usuario._id)}>
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedId > 0 ? "Alterar Usuário" : "Adicionar Usuário"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UsuarioEdit ref={usuarioEditRef} _id={selectedId} />
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
        <Modal.Body>Tem certeza que deseja excluir este Usuário?</Modal.Body>
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

export default UsuariosPage;
