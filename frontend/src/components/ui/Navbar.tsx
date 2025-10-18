import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { roleBasedLinks } from '../../constants/roleLinks';
import { NavLink } from '../../types/navigation';
import { toast } from 'react-toastify';

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { role, user, isAuthenticated, logout } = useAuthStore();

  const safeRole = role ?? 'public';
  const links: NavLink[] = roleBasedLinks[safeRole] ?? [];

  const hiddenRoutes = ['/login', '/register'];
  const shouldHideNavbar = hiddenRoutes.includes(location.pathname);

  if (shouldHideNavbar) return null;

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada correctamente');
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-[var(--color-inverted)] font-[var(--font-monserrat)]">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/favicon.ico"
            alt="Logo Health Tech"
            className="w-8 h-8 rounded-full border-2 border-[var(--color-primary)] bg-white object-contain"
          />
          <span className="text-xl font-bold tracking-tight">Health Tech</span>
        </Link>

        {/* Hamburguesa */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Links desktop */}
        <ul className="hidden md:flex gap-6 items-center">
          {links.map(({ label, to }) => (
            <li key={to}>
              <Link to={to} className="hover:underline">
                {label}
              </Link>
            </li>
          ))}

          {/* Botones públicos */}
          {safeRole === 'public' && (
            <>
              <li>
                <Link to="/login" onClick={() => setOpen(false)} className="bg-[var(--color-accent)] text-white px-4 py-2 rounded hover:bg-[var(--color-accent-hover)] transition">
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={() => setOpen(false)} className="block border border-[var(--color-accent)] text-white px-4 py-1 rounded transition-all duration-200 hover:outline hover:outline-[var(--color-accent-hover)] hover:border-1">
                  Registrarse
                </Link>
              </li>
            </>
          )}

          {/* Usuario logueado */}
          {isAuthenticated && (
            <>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-white text-primary px-3 py-1 rounded hover:bg-gray-100 transition"
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Links mobile */}
      {open && (
        <ul className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-primary text-white animate__animated animate__fadeInDown">
          {links.map(({ label, to }) => (
            <li key={to}>
              <Link to={to} onClick={() => setOpen(false)} className="block py-2">
                {label}
              </Link>
            </li>
          ))}

          {safeRole === 'public' && (
            <>
              <li>
                <Link to="/login" onClick={() => setOpen(false)} className="block py-2">
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={() => setOpen(false)} className="block py-2">
                  Registrarse
                </Link>
              </li>
            </>
          )}

          {isAuthenticated && (
            <>
              
              <li>
                <button onClick={handleLogout} className="block py-2 text-left w-full">
                  Cerrar sesión
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

