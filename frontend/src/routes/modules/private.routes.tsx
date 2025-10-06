import { Suspense, lazy } from 'react';
import type { JSX } from 'react';
import ProtectedRoute from '../ProtectedRoute';
import Dashboard from '../../pages/Dashboard';
import HistoryPage from '../../pages/HistoryPage';
import Profile from '../../pages/Profile';
import { ROUTES } from '../../routes/routes';

const LazyDashboard = lazy(() => import('../../pages/Dashboard'));
type PrivateRoute = {
  path: string;
  element: JSX.Element;
  roles: string[];
};

export const PrivateRoutes: PrivateRoute[] = [
  { 
    path: ROUTES.DASHBOARD, 
    element: (
      <ProtectedRoute allowedRoles={['admin', 'medic']}>
        <Dashboard />
      </ProtectedRoute>
    ),
    roles: ['admin', 'patient', 'medic'],
  },
  { 
    path: ROUTES.HISTORYPAGE, 
    element: (
      <ProtectedRoute allowedRoles={['admin', 'medic']}>
        <HistoryPage />
      </ProtectedRoute>
    ),
    roles: ['admin', 'patient', 'medic'], 
  },
  { 
    path: ROUTES.PROFILE,
    element: (
      <ProtectedRoute allowedRoles={['admin', 'medic']}>
        <Profile />
      </ProtectedRoute>
    ),
    roles: ['admin', 'patient', 'medic'], 
  },
];
