export const ROUTES = {
  // Public Routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ABOUT: '/about',
  COMPONENTS: '/components',
  NOTFOUND: '*',
  CONTACT: '/contact',
  
  // Private Routes
  DASHBOARD: '/dashboard',
  PATIENTS: '/patients',  
  SETUP_PROFILE: 'setup/profile',  
  PROFILE: '/profile',
  EDIT_PROFILE: 'edit/profile',  
  CREATE_APPOINTMENT: 'create/appointment', 
  PRACTITIONERS: '/practitioners',   
  APPOINTMENTS: '/appointments',  
  ENCOUNTER: '/encounter',
  ACCOUNT: '/account',
  SETTINGS: '/settings',
  
} as const;

export type TypeRoutes = keyof typeof ROUTES;
