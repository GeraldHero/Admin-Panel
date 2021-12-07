import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// import AuthContext from '../../context/auth/authContext'
const PrivateRoute = () => {
  var auth = JSON.parse(localStorage.getItem('userInfo'));

  return auth?.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
