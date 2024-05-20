import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import empresaService from "../services/empresaService";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Card, Form, FormControl, InputGroup } from "react-bootstrap";

const EmpresaEdit = forwardRef(({ _id }, ref) => {
  const [empresa, setEmpresa] = useState({});

  const load = async () => {
    if (_id) {
      const empresaData = await empresaService.loadEmpresa(_id);
      if (!empresaData) return;
      setEmpresa(empresaData);
    }
  };

  const save = async () => {
    return empresaService.saveEmpresa(empresa);
  };

  useEffect(() => {
    load();
  }, [_id]);

  useImperativeHandle(ref, () => ({
    save,
    load,
  }));

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <form>
            <Card className="mb-3">
              <Card.Header>
                <Card.Title>Dados Básicos</Card.Title>
              </Card.Header>
              <Card.Body>
                <InputGroup className="mb-3">
                  <InputGroup.Text>Nome</InputGroup.Text>
                  <FormControl
                    type="text"
                    value={empresa.nome}
                    onChange={(e) => setEmpresa({ ...empresa, nome: e.target.value })}
                  />
                </InputGroup>

                <InputGroup className="mb-3">
                  <InputGroup.Text>CNPJ</InputGroup.Text>
                  <FormControl
                    type="text"
                    value={empresa.cnpj}
                    onChange={(e) => setEmpresa({ ...empresa, cnpj: e.target.value })}
                  />
                </InputGroup>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Switch
                    id="ativo"
                    label="Ativo"
                    checked={empresa.ativo}
                    onChange={(e) => setEmpresa({ ...empresa, ativo: e.target.checked })}
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            <Card className="mb-3">
              <Card.Header>
                <Card.Title>Acesso Omie</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col xs={12} md={6}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>AppKey</InputGroup.Text>
                      <FormControl
                        type="text"
                        value={empresa.authOmie?.appKey}
                        onChange={(e) =>
                          setEmpresa({
                            ...empresa,
                            authOmie: { ...empresa.authOmie, appKey: e.target.value },
                          })
                        }
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>AppSecret</InputGroup.Text>
                      <FormControl
                        type="text"
                        value={empresa.authOmie?.appSecret}
                        onChange={(e) =>
                          setEmpresa({
                            ...empresa,
                            authOmie: { ...empresa.authOmie, appSecret: e.target.value },
                          })
                        }
                      />
                    </InputGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>AppHash</InputGroup.Text>
                      <FormControl
                        type="text"
                        value={empresa.authOmie?.appHash}
                        onChange={(e) =>
                          setEmpresa({
                            ...empresa,
                            authOmie: { ...empresa.authOmie, appHash: e.target.value },
                          })
                        }
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="mb-3">
              <Card.Header>
                <Card.Title>Endereço</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col xs={12} md={6}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Logradouro</InputGroup.Text>
                      <FormControl
                        type="text"
                        value={empresa.endereco?.logradouro}
                        onChange={(e) =>
                          setEmpresa({
                            ...empresa,
                            endereco: { ...empresa.endereco, logradouro: e.target.value },
                          })
                        }
                      />
                    </InputGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Número</InputGroup.Text>
                      <FormControl
                        type="text"
                        value={empresa.endereco?.numero}
                        onChange={(e) =>
                          setEmpresa({
                            ...empresa,
                            endereco: { ...empresa.endereco, numero: e.target.value },
                          })
                        }
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Complemento</InputGroup.Text>
                      <FormControl
                        type="text"
                        value={empresa.endereco?.complemento}
                        onChange={(e) =>
                          setEmpresa({
                            ...empresa,
                            endereco: { ...empresa.endereco, complemento: e.target.value },
                          })
                        }
                      />
                    </InputGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Bairro</InputGroup.Text>
                      <FormControl
                        type="text"
                        value={empresa.endereco?.bairro}
                        onChange={(e) =>
                          setEmpresa({
                            ...empresa,
                            endereco: { ...empresa.endereco, bairro: e.target.value },
                          })
                        }
                      />
                    </InputGroup>{" "}
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Cidade</InputGroup.Text>
                      <FormControl
                        type="text"
                        value={empresa.endereco?.cidade}
                        onChange={(e) =>
                          setEmpresa({
                            ...empresa,
                            endereco: { ...empresa.endereco, cidade: e.target.value },
                          })
                        }
                      />
                    </InputGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Estado</InputGroup.Text>
                      <FormControl
                        type="text"
                        value={empresa.endereco?.estado}
                        onChange={(e) =>
                          setEmpresa({
                            ...empresa,
                            endereco: { ...empresa.endereco, estado: e.target.value },
                          })
                        }
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="mb-3">
              <Card.Header>
                <Card.Title>Adiantamento Contas a Receber</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col xs={12} md={6}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Categoria</InputGroup.Text>
                      <FormControl
                        type="text"
                        value={empresa.adiantamento?.categoria}
                        onChange={(e) =>
                          setEmpresa({
                            ...empresa,
                            adiantamento: { ...empresa.adiantamento, categoria: e.target.value },
                          })
                        }
                      />
                    </InputGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Conta Corrente</InputGroup.Text>
                      <FormControl
                        type="text"
                        value={empresa.adiantamento?.contaCorrente}
                        onChange={(e) =>
                          setEmpresa({
                            ...empresa,
                            adiantamento: {
                              ...empresa.adiantamento,
                              contaCorrente: e.target.value,
                            },
                          })
                        }
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card className="mb-3">
              <Card.Header>
                <Card.Title>Dados de Pagamento</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col xs={12} md={6}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Tipo</InputGroup.Text>
                      <FormControl
                        type="text"
                        value={empresa.dadosPagamento?.tipo}
                        onChange={(e) =>
                          setEmpresa({
                            ...empresa,
                            dadosPagamento: { ...empresa.dadosPagamento, tipo: e.target.value },
                          })
                        }
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Banco</InputGroup.Text>
                      <FormControl
                        type="text"
                        value={empresa.dadosPagamento?.banco}
                        onChange={(e) =>
                          setEmpresa({
                            ...empresa,
                            dadosPagamento: { ...empresa.dadosPagamento, banco: e.target.value },
                          })
                        }
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Agência</InputGroup.Text>
                      <FormControl
                        type="text"
                        value={empresa.dadosPagamento?.agencia}
                        onChange={(e) =>
                          setEmpresa({
                            ...empresa,
                            dadosPagamento: { ...empresa.dadosPagamento, agencia: e.target.value },
                          })
                        }
                      />
                    </InputGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>Conta</InputGroup.Text>
                      <FormControl
                        type="text"
                        value={empresa.dadosPagamento?.conta}
                        onChange={(e) =>
                          setEmpresa({
                            ...empresa,
                            dadosPagamento: { ...empresa.dadosPagamento, conta: e.target.value },
                          })
                        }
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>SWIFT</InputGroup.Text>
                      <FormControl
                        type="text"
                        value={empresa.dadosPagamento?.swift}
                        onChange={(e) =>
                          setEmpresa({
                            ...empresa,
                            dadosPagamento: { ...empresa.dadosPagamento, swift: e.target.value },
                          })
                        }
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputGroup.Text>IBAN</InputGroup.Text>
                      <FormControl
                        type="text"
                        value={empresa.dadosPagamento?.iban}
                        onChange={(e) =>
                          setEmpresa({
                            ...empresa,
                            dadosPagamento: { ...empresa.dadosPagamento, iban: e.target.value },
                          })
                        }
                      />
                    </InputGroup>
                  </Col>
                  <Col xs={12} md={6}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>PIX</InputGroup.Text>
                      <FormControl
                        type="text"
                        value={empresa.dadosPagamento?.pix}
                        onChange={(e) =>
                          setEmpresa({
                            ...empresa,
                            dadosPagamento: { ...empresa.dadosPagamento, pix: e.target.value },
                          })
                        }
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
});

export default EmpresaEdit;
