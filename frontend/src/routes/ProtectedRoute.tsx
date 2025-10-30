import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import {JSX} from "react";
import { Loading } from '../components/ui/Loading';

type ProtectedRouteProps = {
  children: JSX.Element;
  allowedRoles?: string[];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuthStore();

  if (isLoading) return <Loading fullScreen />;

  if (!user || (allowedRoles && !allowedRoles.map(r => r.toLowerCase()).includes(user.role.toLowerCase()))) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
