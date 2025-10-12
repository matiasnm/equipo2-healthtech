import { Suspense, lazy } from 'react';
import type { JSX } from 'react';
import ProtectedRoute from '../ProtectedRoute';
import History from '../../pages/History';
import Profile from '../../pages/Profile';
import { ROUTES } from '../../routes/routes';
import Account from '../../pages/Account';
import Professionals from '../../pages/Professionals';
import Patients from '../../pages/Patients';

const LazyDashboard = lazy(() => import('../../pages/Dashboard'));

type PrivateRoute = { 
  path: string;
  element: JSX.Element;
  allowedRoles: string[];
};

export const PrivateRoutes: PrivateRoute[] = [
  {
    path: ROUTES.DASHBOARD,
    element: (
      <ProtectedRoute allowedRoles={['admin', 'medic', 'patient', 'superadmin']}>
        <Suspense fallback={<div>Cargando dashboard...</div>}>
          <LazyDashboard />
        </Suspense>
      </ProtectedRoute>
    ),
    allowedRoles: ['admin', 'medic', 'patient', 'superadmin'],
  },
  {
    path: ROUTES.HISTORY,
    element: (
      <ProtectedRoute allowedRoles={['admin', 'medic', 'superadmin']}>
        <History />
      </ProtectedRoute>
    ),
    allowedRoles: ['admin', 'medic', 'superadmin'],
  },
  {
    path: ROUTES.PROFILE,
    element: (
      <ProtectedRoute allowedRoles={['patient', 'medic', 'superadmin']}>
        <Profile />
      </ProtectedRoute>
    ),
    allowedRoles: ['patient', 'medic', 'superadmin'],
  },
  {
    path: ROUTES.ACCOUNT,
    element: (
      <ProtectedRoute allowedRoles={['patient', 'admin', 'superadmin']}>
        <Account />
      </ProtectedRoute>
    ),
    allowedRoles: ['patient', 'admin', 'superadmin'],
  },
  {
    path: ROUTES.PROFESSIONALS,
    element: (
      <ProtectedRoute allowedRoles={['admin', 'medic', 'patient', 'superadmin']}>
        <Professionals />
      </ProtectedRoute>
    ),
    allowedRoles: ['admin', 'medic', 'patient', 'superadmin'],
  },
  {
    path: ROUTES.PATIENTS,
    element: (
      <ProtectedRoute allowedRoles={['admin', 'medic', 'superadmin']}>
        <Patients />
      </ProtectedRoute>
    ),
    allowedRoles: ['admin', 'medic', 'superadmin'],
  },
];
