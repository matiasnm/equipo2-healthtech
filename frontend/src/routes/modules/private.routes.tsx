import { Suspense, lazy } from 'react';
import type { JSX } from 'react';
import ProtectedRoute from '../ProtectedRoute';
import Encounter from '../../pages/Encounter';
import Profile from '../../pages/Profile';
import { ROUTES } from '../../routes/routes';
import Account from '../../pages/Account';
import Appointments from '../../pages/Appointments';
import Patients from '../../pages/Patients';
import Practitioners from '../../pages/Practitioners';

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
      <ProtectedRoute allowedRoles={['admin', 'practitioner', 'superadmin']}>
        <Suspense fallback={<div>Cargando dashboard...</div>}>
          <LazyDashboard />
        </Suspense>
      </ProtectedRoute>
    ),
    allowedRoles: ['admin', 'practitioner', 'superadmin'],
  },
  {
    path: ROUTES.ENCOUNTER,
    element: (
      <ProtectedRoute allowedRoles={['admin', 'patient', 'superadmin']}>
        <Encounter />
      </ProtectedRoute>
    ),
    allowedRoles: ['admin', 'patient', 'superadmin'],
  },
  {
    path: ROUTES.PROFILE,
    element: (
      <ProtectedRoute allowedRoles={['admin', 'practitioner', 'patient', 'superadmin']}>
        <Profile />
      </ProtectedRoute>
    ),
    allowedRoles: ['admin', 'practitioner', 'patient', 'superadmin'],
  },
  {
    path: ROUTES.ACCOUNT,
    element: (
      <ProtectedRoute allowedRoles={['admin', 'practitioner', 'patient', 'superadmin']}>
        <Account />
      </ProtectedRoute>
    ),
    allowedRoles: ['admin', 'practitioner', 'patient', 'superadmin'],
  },
  {
    path: ROUTES.PRACTITIONERS,
    element: (
      <ProtectedRoute allowedRoles={['admin', 'practitioner', 'patient', 'superadmin']}>
        <Practitioners />
      </ProtectedRoute>
    ),
    allowedRoles: ['admin', 'practitioner', 'patient', 'superadmin'],
  },
  {
    path: ROUTES.APPOINTMENTS,
    element: (
      <ProtectedRoute allowedRoles={['admin', 'practitioner', 'superadmin']}>
        <Appointments />
      </ProtectedRoute>
    ),
    allowedRoles: ['admin', 'practitioner', 'superadmin'],
  },
  {
    path: ROUTES.PATIENTS,
    element: (
      <ProtectedRoute allowedRoles={['admin', 'practitioner', 'superadmin']}>
        <Patients />
      </ProtectedRoute>
    ),
    allowedRoles: ['admin', 'practitioner', 'superadmin'],
  },
];
