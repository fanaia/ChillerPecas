import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Card, FormControl, InputGroup, Row, Col, Form } from "react-bootstrap";
import includeService from "../services/includeService";

const IncludeEdit = forwardRef(({ _id }, ref) => {
  const [include, setInclude] = useState({
    nome: "",
    descricao: "",
    conteudo: "",
  });

  const load = async () => {
    if (_id) {
      const loadedInclude = await includeService.loadInclude(_id);
      if (!loadedInclude) return;

      setInclude(loadedInclude);
    }
  };

  const save = async () => {
    return await includeService.saveInclude(include);
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
            value={include.nome}
            onChange={(e) => setInclude({ ...include, nome: e.target.value })}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>Descrição</InputGroup.Text>
          <FormControl
            type="text"
            value={include.descricao}
            onChange={(e) => setInclude({ ...include, descricao: e.target.value })}
          />
        </InputGroup>

        <Form.Group>
          <Form.Label>Conteúdo</Form.Label>
          <FormControl
            as="textarea"
            rows={5}
            value={include.conteudo}
            onChange={(e) => setInclude({ ...include, conteudo: e.target.value })}
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
});

export default IncludeEdit;
