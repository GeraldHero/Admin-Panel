import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export const MyFooter = () => {
  const { pathname } = useLocation();

  if (pathname === '/dashboard') return null;
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; 2021</Col>
        </Row>
      </Container>
    </footer>
  );
};
