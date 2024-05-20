import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Card, FormControl, InputGroup, Row, Col, Form } from "react-bootstrap";
import templateService from "../services/templateService";

const TemplateEdit = forwardRef(({ _id }, ref) => {
  const [template, setTemplate] = useState({
    nome: "",
    codigo: "",
    templateEjs: "",
  });

  const load = async () => {
    if (_id) {
      const loadedTemplate = await templateService.loadTemplate(_id);
      if (!loadedTemplate) return;

      setTemplate(loadedTemplate);
    }
  };

  const save = async () => {
    return await templateService.saveTemplate(template);
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
            value={template.nome}
            onChange={(e) => setTemplate({ ...template, nome: e.target.value })}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>Descrição</InputGroup.Text>
          <FormControl
            type="text"
            value={template.descricao}
            onChange={(e) => setTemplate({ ...template, descricao: e.target.value })}
          />
        </InputGroup>

        <Form.Group>
          <Form.Label>Template EJS</Form.Label>
          <FormControl
            as="textarea"
            rows={5}
            value={template.templateEjs}
            onChange={(e) => setTemplate({ ...template, templateEjs: e.target.value })}
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
});

export default TemplateEdit;
