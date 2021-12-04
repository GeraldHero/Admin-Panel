import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import MyButton from '../../components/myButton/MyButton';
import myStyle from './MyLoginForm.module.css';
const MyLoginForm = () => {
  return (
    <Container className="mt-5 p-5">
      <Row>
        <Col>
          <div className={myStyle.backImage}></div>
        </Col>
        <Col md={6} xs={12}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                aria-describedby="passwordHelpBlock"
              />
              <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters.
              </Form.Text>
            </Form.Group>
            <MyButton> Submit </MyButton>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default MyLoginForm;
