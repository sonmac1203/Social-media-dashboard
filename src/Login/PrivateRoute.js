import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import NavBar from '../components/NavBar';

const PrivateRoute = () => {
  const { currentUser } = useAuth();
  return currentUser ? (
    <div>
      <NavBar />
      <Outlet />
    </div>
  ) : (
    <Navigate to='/login' />
  );
};

export default PrivateRoute;
