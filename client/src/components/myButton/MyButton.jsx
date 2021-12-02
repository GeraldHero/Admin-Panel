import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

const MyButton = (props) => {
  const { loading, text } = props;
  return (
    <Button variant="primary" type="submit">
      {loading ? <Spinner animation="border" variant="success" /> : text}
    </Button>
  );
};

export default MyButton;
