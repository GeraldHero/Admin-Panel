import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
const MyMessage = ({ variant, children }) => {
  const [show, setShow] = useState(true);
  if (show)
    return (
      <Alert variant={variant} onClose={() => setShow(false)} dismissible>
        {children}
      </Alert>
    );
  return null;
};
MyMessage.defaultProps = {
  variant: 'info',
};

export default MyMessage;
