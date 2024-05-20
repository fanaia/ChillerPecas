import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const Header = () => (
  <header>
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/auth/home" style={{ paddingLeft: "1rem" }}>
        ChillerPeças - Omie
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" style={{ paddingLeft: "1rem" }}>
        <Nav>
          <Nav.Link as={Link} to="/auth/usuarios">
            Usuários
          </Nav.Link>
          <Nav.Link as={Link} to="/auth/empresas">
            Empresas
          </Nav.Link>
          <Nav.Link as={Link} to="/auth/templates">
            Templates
          </Nav.Link>
          <Nav.Link as={Link} to="/auth/includes">
            Includes
          </Nav.Link>
          <Nav.Link as={Link} to="/">
            Sair
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </header>
);

export default Header;