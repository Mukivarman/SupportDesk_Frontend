import React from 'react';
import Loading from 'react-loading';
import ReactLoading from 'react-loading';
 
const LoadingBar= ({ type, color }) => (
    <ReactLoading type={type} color={color} height={'10%'} width={'10%'}  />
);
 
export default LoadingBar;