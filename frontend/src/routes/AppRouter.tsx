import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicRoutes } from './modules/public.routes';
import { PrivateRoutes } from './modules/private.routes';
import { useAuth } from '../hooks/useAuth';
import NotFound from '../pages/NotFound'; 

export const AppRouter = () => {
  const { isAuthenticated, role } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {PublicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {PrivateRoutes.map(({ path, element, roles }) => (
          <Route
            key={path}
            path={path}
            element={isAuthenticated && roles.includes(role || '') ? element : <Navigate to="/login" /> }
          />
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
