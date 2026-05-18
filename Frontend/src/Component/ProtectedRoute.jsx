import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('token'));
  console.log("token", user);

  if (!user) {
    return <Navigate to="/login"/>;
  }

  console.log("children",children);
  
  return children;
}

export default ProtectedRoute;


