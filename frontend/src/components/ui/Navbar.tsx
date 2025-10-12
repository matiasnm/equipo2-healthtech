import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Iconos de hamburguesa y cerrar

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'Inicio', to: '/' },
    { label: 'Pacientes', to: '/pacientes' },
    { label: 'Turnos', to: '/turnos' },
    { label: 'Perfil', to: '/perfil' },
  ];

  return (
    <nav className="bg-primary text-white font-sans">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight">
          HealthTech
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
        <ul className="hidden md:flex gap-6">
          {links.map(({ label, to }) => (
            <li key={to}>
              <Link to={to} className="hover:underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Links mobile */}
      {open && (
        <ul className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-primary text-white">
          {links.map(({ label, to }) => (
            <li key={to}>
              <Link to={to} onClick={() => setOpen(false)} className="block py-2">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};
