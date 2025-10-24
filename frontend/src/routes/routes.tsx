import ProfileSetupForm from "components/ProfileSetupForm";

export const ROUTES = {
  // Public Routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ABOUT: '/about',
  COMPONENTS: '/components',
  NOTFOUND: '*',

  // Private Routes
  DASHBOARD: '/dashboard',
  ENCOUNTER: '/encounter',
  PROFILE: '/profile',
  PROFILE_SETUP: '/profile/setup',
  EDIT_PROFILE: '/profile/edit',
  ACCOUNT: '/account',
  APPOINTMENTS: '/appointments',
  PRACTITIONERS: '/practitioners',
  PATIENTS: '/patients',
  SETTINGS: '/settings',
  
} as const;

export type TypeRoutes = keyof typeof ROUTES;
