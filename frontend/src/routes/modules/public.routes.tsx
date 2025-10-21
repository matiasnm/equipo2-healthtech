import Login from '../../pages/Login';
import Register from '../../pages/Register';
import About from '../../pages/About';
import Home from '../../pages/Home';
import type { JSX } from 'react';
import Components from '../../pages/Components';
import Contact from '../../pages/Contact';

type PublicRoute = {
  path: string;
  element: JSX.Element;
};
 
export const PublicRoutes: PublicRoute[] = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/about', element: <About /> },
  { path: '/components', element: <Components /> },
  { path: '/contact', element: <Contact /> },

];
