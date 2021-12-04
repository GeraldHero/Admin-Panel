import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listEmployee } from '../reduxConfig/action/employeeActions';
import MyLoader from '../components/myLoader/MyLoader';
import MyError from '../components/myMessage/MyMessage';

const MyHomePage = () => {
  const dispatch = useDispatch();
  const employeeList = useSelector((state) => state.employeeList);
  const { error, employee, loading } = employeeList;

  useEffect(() => {
    dispatch(listEmployee());
  }, [dispatch]);

  return loading ? (
    <MyLoader />
  ) : error ? (
    <MyError variant="danger">{error}</MyError>
  ) : (
    <div>this homepage</div>
  );
};

export default MyHomePage;
