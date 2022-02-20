import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import NavBar from '../NavBar';

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
