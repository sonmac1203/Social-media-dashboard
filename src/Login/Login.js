import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert, Container } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { logIn } = useAuth();
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setFailed(false);
      await logIn(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      console.log(error);
      setFailed(true);
    } finally {
      setLoading(false);
      navigate('/');
    }
  };

  return (
    <Container
      className='d-flex align-items-center justify-content-center'
      style={{ minHeight: '100vh' }}
    >
      <div className='w-100' style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className='text-center mb-4'>Log In</h2>
            {failed && <Alert variant='danger'>Please try again !!!</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' ref={emailRef} required />
              </Form.Group>
              <Form.Group id='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className='w-100 mt-4' type='submit'>
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className='w-100 text-center'>
          Need an account? <Link to='/signup'>Sign Up</Link>
        </div>
      </div>
    </Container>
  );
};

export default Login;
