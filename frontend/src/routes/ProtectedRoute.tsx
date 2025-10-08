import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { JSX } from 'react';


type ProtectedRouteProps = {
  children: JSX.Element;
  allowedRoles?: string[];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated || (allowedRoles && !allowedRoles.includes(role || ''))) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


export default ProtectedRoute;
