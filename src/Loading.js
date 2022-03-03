import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
  const spinners = [];
  for (let i = 0; i < 3; i++) {
    spinners.push(
      <Spinner animation='grow' variant='dark' className='me-2' key={i} />
    );
  }
  return spinners;
};

export default Loading;
