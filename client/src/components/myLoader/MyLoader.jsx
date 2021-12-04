import React from 'react';
import myStyle from './MyLoader.module.css';

const MyLoading = () => {
  return (
    <div className={myStyle.centerDiv}>
      <span className={myStyle.loader}></span>
    </div>
  );
};

export default MyLoading;
