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
  HISTORY: '/history',
  PROFILE: '/profile',
  ACCOUNT: '/account',
  AGENDA: '/agenda',
  PROFESSIONALS: '/professionals',
  PATIENTS: '/patients',
  SETTINGS: '/settings',
  
} as const;

export type TypeRoutes = keyof typeof ROUTES;
