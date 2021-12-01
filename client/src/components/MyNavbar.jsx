import React from 'react';

import { Navbar, Container, Nav } from 'react-bootstrap';
const MyNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Admin</Navbar.Brand>
        <Nav className="me-right  mx-5">
          <Nav.Link className="mx-2" href="#home">
            Home
          </Nav.Link>
          <Nav.Link className="mx-3" href="#features">
            About
          </Nav.Link>
          <Nav.Link className="mr-5" href="#pricing">
            Login
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
