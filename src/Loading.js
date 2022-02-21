import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
  const spinners = [];
  for (var i = 0; i < 3; i++) {
    spinners.push(<Spinner animation='grow' variant='dark' className='me-2' />);
  }
  return <>{spinners}</>;
};

export default Loading;
