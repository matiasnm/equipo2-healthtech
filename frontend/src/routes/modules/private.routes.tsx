import { Suspense, lazy } from 'react';
import type { JSX } from 'react';
import ProtectedRoute from '../ProtectedRoute';
import Encounter from '../../pages/Encounter';
import Profile from '../../pages/Profile';
import ProfileSetupForm from '../../components/ProfileSetupForm';
import { ROUTES } from '../../routes/routes';
import ErrorBoundary from '../../components/ErrorBoundary';
import Account from '../../pages/Account';
import Appointments from '../../pages/Appointments';
import Patients from '../../pages/Patients';
import Practitioners from '../../pages/Practitioners';

const LazyDashboard = lazy(() => import('../../pages/Dashboard'));
const LazyProfileSetupForm = lazy(() => import('../../components/ProfileSetupForm'));
// const LazyEditProfile = lazy(() => import('../../pages/EditProfile'));

type PrivateRoute = { 
  path: string;
  element: JSX.Element;
  allowedRoles: string[];
};

export const PrivateRoutes: PrivateRoute[] = [
  {
    path: ROUTES.DASHBOARD,
    element: (
      <ProtectedRoute allowedRoles={['admin', 'practitioner']}>
        <Suspense fallback={<div>Cargando dashboard...</div>}>
          <LazyDashboard />
        </Suspense>
      </ProtectedRoute>
    ),
    allowedRoles: ['admin', 'practitioner'],
  },
  {
    path: ROUTES.ENCOUNTER,
    element: (
      <ProtectedRoute allowedRoles={['admin', 'patient']}>
        <Encounter />
      </ProtectedRoute>
    ),
    allowedRoles: ['admin', 'patient'],
  },
  {
    path: ROUTES.PROFILE,
    element: (
      <ProtectedRoute allowedRoles={['admin', 'practitioner', 'patient']}>
        <Account initialTab={'profile'} />
      </ProtectedRoute>
    ),
    allowedRoles: ['admin', 'practitioner', 'patient'],
  },

  {
  path: ROUTES.PROFILE_SETUP,
  element: (
    <ProtectedRoute allowedRoles={['admin', 'practitioner', 'patient']}>
      <Suspense fallback={<div>Cargando perfil...</div>}>
      <ErrorBoundary>
        <LazyProfileSetupForm />
      </ErrorBoundary>
      </Suspense>
    </ProtectedRoute>
  ),
  allowedRoles: ['admin', 'practitioner', 'patient'],
},

{
  path: ROUTES.EDIT_PROFILE,
  element: (
    <ProtectedRoute allowedRoles={['admin', 'practitioner', 'patient']}>
      <Profile />
    </ProtectedRoute>
  ),
  allowedRoles: ['admin', 'practitioner', 'patient'],
},

  {
    path: ROUTES.ACCOUNT,
    element: (
      <ProtectedRoute allowedRoles={['admin', 'practitioner', 'patient']}>
        <Account initialTab={'account'} />
      </ProtectedRoute>
    ),
    allowedRoles: ['admin', 'practitioner', 'patient'],
  },
  {
    path: ROUTES.PRACTITIONERS,
    element: (
      <ProtectedRoute allowedRoles={['admin', 'practitioner', 'patient']}>
        <Practitioners />
      </ProtectedRoute>
    ),
    allowedRoles: ['admin', 'practitioner', 'patient'],
  },
  {
    path: ROUTES.APPOINTMENTS,
    element: (
      <ProtectedRoute allowedRoles={['admin', 'practitioner']}>
        <Appointments />
      </ProtectedRoute>
    ),
    allowedRoles: ['admin', 'practitioner'],
  },
  {
    path: ROUTES.PATIENTS,
    element: (
      <ProtectedRoute allowedRoles={['admin', 'practitioner']}>
        <Patients />
      </ProtectedRoute>
    ),
    allowedRoles: ['admin', 'practitioner'],
  },
];
