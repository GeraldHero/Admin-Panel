import React from 'react';
import { Alert } from 'react-bootstrap';
const MyMessage = ({ variant, children }) => {
  return (
    <Alert className="m-5" variant={variant}>
      {children}
    </Alert>
  );
};
MyMessage.defaultProps = {
  variant: 'info',
};

export default MyMessage;
