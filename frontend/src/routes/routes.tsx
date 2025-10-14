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
  ACCOUNT: '/account',
  APPOINTMENTS: '/appointments',
  PRACTITIONERS: '/practitioners',
  PATIENTS: '/patients',
  SETTINGS: '/settings',
  
} as const;

export type TypeRoutes = keyof typeof ROUTES;
