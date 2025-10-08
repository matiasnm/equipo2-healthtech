export const ROUTES = {
  // Public Routes
    LOGIN: '/login',
    REGISTER: '/register',
    HOME: '/',
    NOTFOUND: '*',
    ABOUT: '/about',

  // Privates Routes
    DASHBOARD: '/dashboard',
    HISTORYPAGE: '/historypage',
    PROFILE: '/profile',
    SETTINGS: '/settings',
} as const;

export type TypeRoutes = keyof typeof ROUTES;