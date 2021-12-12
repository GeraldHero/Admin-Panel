import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import MyDashboardSidebar from '../controllers/myDashboardSidebar/MyDashboardSidebar';
const MyDashboard = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let navigate = useNavigate();

  useEffect(() => {
    if (!userInfo?.token) {
      navigate('/login');
    }
  }, [navigate, userInfo]);

  return (
    <div className="container-fluid">
      <Row>
        <Col md={2}>
          <MyDashboardSidebar />
        </Col>
        <Col xs={12} md={8}>
          <Container className="m-5">
            <Outlet />{' '}
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default MyDashboard;
