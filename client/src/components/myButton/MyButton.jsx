import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import myStyle from './myButton.module.css';

const MyButton = (props) => {
  const { loading, children } = props;
  return (
    <Button className={myStyle.buttonSize} variant="primary" type="submit">
      {loading ? (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      ) : (
        children
      )}
    </Button>
  );
};
MyButton.defaultProps = {
  loading: false,
};
export default MyButton;
