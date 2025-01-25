import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user } = useAuth();

  // console.log("User:", user); // Debugging output
  // console.log("Allowed Roles:", allowedRoles);
  // console.log("User Role:", user?.role)

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/auth/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Redirect if user does not have the required role
    return <Navigate to="/unauthorized" replace />;
  }
  

  // If authenticated and authorized, render the element
  return element;
};

export default ProtectedRoute;
