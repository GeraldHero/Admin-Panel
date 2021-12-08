import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import MyDashboardSidebar from '../controllers/myDashboardSidebar/MyDashboardSidebar';
const MyDashboard = () => {
  const dispatch = useDispatch();
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
        <Col md={3}>
          <MyDashboardSidebar />
        </Col>
        <Col xs={12} md={8}>
          this is my context
        </Col>
      </Row>
    </div>
  );
};

export default MyDashboard;
