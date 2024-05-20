import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import usuarioService from "../services/usuarioService";
import { Card, FormControl, InputGroup, Row, Col, Form } from "react-bootstrap";

const UsuarioEdit = forwardRef(({ _id }, ref) => {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
    notificarFalha: false,
    ativo: true,
  });

  const load = async () => {
    if (_id) {
      const loadedUsuario = await usuarioService.loadUsuario(_id);
      if (!loadedUsuario) return;
      loadedUsuario.senha = "";
      setUsuario(loadedUsuario);
    }
  };

  const save = async () => {
    return await usuarioService.saveUsuario(usuario);
  };

  useEffect(() => {
    load();
  }, [_id]);

  useImperativeHandle(ref, () => ({
    save,
    load,
  }));

  return (
    <Card className="mb-3">
      <Card.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text>Nome</InputGroup.Text>
          <FormControl
            type="text"
            value={usuario.nome}
            onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Email</InputGroup.Text>
          <FormControl
            type="text"
            value={usuario.email}
            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>Senha</InputGroup.Text>
          <FormControl
            type="password"
            value={usuario.senha}
            onChange={(e) => setUsuario({ ...usuario, senha: e.target.value })}
          />
        </InputGroup>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Switch
            id="notificarFalha"
            label="Notificar Falha"
            checked={usuario.notificarFalha}
            onChange={(e) => setUsuario({ ...usuario, notificarFalha: e.target.checked })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Switch
            id="ativo"
            label="Ativo"
            checked={usuario.ativo}
            onChange={(e) => setUsuario({ ...usuario, ativo: e.target.checked })}
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
});

export default UsuarioEdit;
