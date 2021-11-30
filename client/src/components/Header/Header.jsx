import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import Coffee from '../../utils/img/coffee.png';
const Header = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={Coffee}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          React Bootstrap
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
