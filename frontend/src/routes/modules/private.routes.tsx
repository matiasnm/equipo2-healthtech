import { Suspense, lazy } from 'react';
import type { JSX } from 'react';
import ProtectedRoute from '../ProtectedRoute';
import Encounter from '../../pages/Encounter';
import Profile from '../../pages/Profile';
import ProfileSetupForm from '../../components/ProfileSetupForm';
import { ROUTES } from '../../routes/routes';
import ErrorBoundary from '../../components/ErrorBoundary';
import AppointmentForm from '../../components/appointments/AppointmentForm';
import CreateAppointment from '../../pages/CreateAppointment';
import Appointments from '../../pages/Appointments';
import Practitioners from '../../pages/Practitioners';
import { EncounterPractitioner } from '../../pages/EncounterPractitioner'
import { Loading } from '../../components/ui';

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
        <Suspense fallback={<Loading fullScreen text='cargando....' />}>
          <LazyDashboard />
        </Suspense>
      </ProtectedRoute>
    ),
    allowedRoles: ['admin', 'practitioner'],
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
    path: ROUTES.SETUP_PROFILE,
    element: (
      <ProtectedRoute allowedRoles={['admin', 'practitioner', 'patient']}>
        <Suspense fallback={<Loading fullScreen text='cargando perfil...' />}>
          <ErrorBoundary>
            <LazyProfileSetupForm />
          </ErrorBoundary>
        </Suspense>
      </ProtectedRoute>
    ),
    allowedRoles: ['admin', 'practitioner', 'patient'],
  },

  {
    path: ROUTES.PROFILE,
    element: (
      <ProtectedRoute allowedRoles={['admin', 'practitioner', 'patient']}>
        <Profile />
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
    path: ROUTES.PRACTITIONERS,
    element: (
      <ProtectedRoute allowedRoles={['admin', 'practitioner', 'patient']}>
        <Practitioners />
      </ProtectedRoute>
    ),
    allowedRoles: ['admin', 'practitioner', 'patient'],
  },

  {
    path: ROUTES.CREATE_APPOINTMENT,
    element: (
      <ProtectedRoute allowedRoles={['patient']}>
        <CreateAppointment />
      </ProtectedRoute>
    ),
    allowedRoles: ['patient'],
  },

  {
    path: ROUTES.APPOINTMENT_FORM,
    element: (
      <ProtectedRoute allowedRoles={['practitioner']}>
        <CreateAppointment />
      </ProtectedRoute>
    ),
    allowedRoles: ['practitioner'],
  },
  {
    path: `${ROUTES.ENCOUNTER}`,
    element: (
      <ProtectedRoute allowedRoles={['admin', 'practitioner', 'patient']}>
        <Encounter />
      </ProtectedRoute>
    ),
    allowedRoles: ['admin', 'practitioner', 'patient'],
  },
  {
    path: `${ROUTES.ENCOUNTER}/practitioner/:id`,
    element: (
      <ProtectedRoute allowedRoles={['practitioner']}>
        <EncounterPractitioner />
      </ProtectedRoute>
    ),
    allowedRoles: ['practitioner'],
  },

];
