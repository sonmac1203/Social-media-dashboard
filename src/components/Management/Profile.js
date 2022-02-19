import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Login/contexts/AuthContext';
import { Col, Card, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { database } from '../../firebase/firebase';
import { ref, query, onValue, equalTo, orderByKey } from 'firebase/database';

export const Profile = () => {
  const [error, setError] = useState('');
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);

  const handleLogout = async () => {
    setError('');
    try {
      await logOut();
    } catch {
      setError('Failed to logout!!!');
    }
    navigate('/login');
  };

  useEffect(() => {
    const userRef = ref(database, 'users');
    onValue(
      query(userRef, orderByKey(), equalTo(currentUser.uid)),
      (snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((item) => {
            setEmail(item.val().email);
          });
        }
      }
    );
  }, []);

  return (
    <div>
      <Col lg={{ span: 6, offset: 3 }}>
        <Card>
          <Card.Body>
            <h2 className='text-center mb-4'>Profile</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            {email && (
              <div>
                <strong>Email:</strong>
                {email}
              </div>
            )}
          </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
          <Button variant='link' onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </Col>
    </div>
  );
};
