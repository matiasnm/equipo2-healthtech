import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuthStore';
import {JSX} from "react";

type ProtectedRouteProps = {
  children: JSX.Element;
  allowedRoles?: string[];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuthStore();

  if (isLoading) return <p className="text-center">Cargando...</p>;

  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
