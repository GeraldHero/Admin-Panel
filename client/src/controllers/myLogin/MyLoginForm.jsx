import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Container, Row, Col } from 'react-bootstrap';
import MyButton from '../../components/myButton/MyButton';
import myStyle from './MyLoginForm.module.css';
import { login } from '../../reduxConfig/action/userActions';
import { useNavigate } from 'react-router-dom';
import MyMessage from '../../components/myMessage/MyMessage';
const MyLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  let navigate = useNavigate();
  console.log(userInfo === []);
  useEffect(() => {
    if (userInfo === []) {
      navigate('/');
    }
  }, [navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <Container className="mt-5 p-5">
      {error && <MyMessage variant="danger">{error}</MyMessage>}
      <Row>
        <Col>
          <div className={myStyle.backImage}></div>
        </Col>
        <Col md={6} xs={12}>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                aria-describedby="passwordHelpBlock"
              />
              <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters.
              </Form.Text>
            </Form.Group>
            <MyButton loading={loading}>Submit </MyButton>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default MyLoginForm;
