import { Routes, Route } from 'react-router-dom';
import { PublicRoutes } from './modules/public.routes';
import { PrivateRoutes } from './modules/private.routes';
import NotFound from '../pages/NotFound';

export const AppRouter = () => {
  return (
    <main className="min-h-screen bg-secondary text-text font-sans">
      <Routes>
        {PublicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {PrivateRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default AppRouter;



