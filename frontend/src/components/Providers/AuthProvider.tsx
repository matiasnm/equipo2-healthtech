import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { redirectByRole } from '../../utils/redirectByRole';
import { PrivateRoutes } from '../../routes/modules/private.routes';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { validateSession, isLoading, isAuthenticated, token, user } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);
  const routes = PrivateRoutes.map(route => route.path);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Solo validar si hay un token pero no está autenticado
        if (token && !user) {
          await validateSession();
        }
      } catch (error) {
        console.error('AuthProvider - Error al validar sesión:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    // Si no hay token, no necesitamos validar
    if (!token) {
      setIsInitializing(false);
      return;
    }

    // Si ya está autenticado, no necesitamos validar de nuevo
    if (token && isAuthenticated && user) {
      setIsInitializing(false);
      if (location.pathname === "/login" || location.pathname === "/register") {
        var path = redirectByRole(user.role);
        navigate(path, { replace: true });
        return;
      } else if (!user.status && routes.includes(location.pathname) && location.pathname !== '/profile/setup') {
        // Si el usuario no está activo y está intentando acceder a una ruta PRIVADA,
        // redirigimos a la configuración de perfil. Si está en una pública, no hacemos nada.
        navigate('/profile/setup', { replace: true });
      }
      return;
    }

    initializeAuth();
  }, [token, isAuthenticated, user, validateSession, location.pathname, navigate]);

  // Mostrar loading mientras se inicializa la autenticación
  if (isInitializing || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando...</p>
        </div>
      </div>
    );
  }

  console.log('AuthProvider - Renderizando children');
  return <>{children}</>;
};

export default AuthProvider;