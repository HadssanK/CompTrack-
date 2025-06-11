import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log("Auth token in PrivateRoute:", token);

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
