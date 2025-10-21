import { NavLink } from '../types/navigation';

export const roleBasedLinks: Record<string, NavLink[]> = {
  superAdmin: [
    { label: 'Reportes', to: '/dashboard' },
    { label: 'Pacientes', to: '/patients' },
    { label: 'Agenda', to: '/appointments' },
    { label: 'Perfil', to: '/profile' },
    { label: 'Profesionales', to: '/practitioners' },
    { label: 'Mi cuenta', to: '/account' },
    { label: 'Registro', to: '/encounter' },
  ],
  admin: [
    { label: 'Reportes', to: '/dashboard' },
    { label: 'Pacientes', to: '/patients' },
    { label: 'Agenda', to: '/appointments' },
    { label: 'Perfil', to: '/profile' },
    { label: 'Profesionales', to: '/practitioners' },
    { label: 'Mi cuenta', to: '/account' },
    { label: 'Registro', to: '/encounter' },
    { label: 'Inicio', to: '/' },
  ],
  practitioner: [
    { label: 'Reportes', to: '/dashboard' },
    { label: 'Pacientes', to: '/patients' },
    { label: 'Agenda', to: '/appointments' },
    { label: 'Perfil', to: '/profile' },
    { label: 'Profesionales', to: '/practitioners' },
    { label: 'Mi cuenta', to: '/account' }
  ],
  patient: [
    { label: 'Perfil', to: '/profile' },
    { label: 'Profesionales', to: '/practitioners' },
    { label: 'Mi cuenta', to: '/account' },
    { label: 'Registro', to: '/encounter' }
  ],
  public: [
    { label: 'Inicio', to: '/' },
    { label: 'Nuestros servicios', to: '/#servicios' },
    { label: 'Sobre Nosotros', to: '/about' },
    { label: 'Contacto', to: '/contact' },
  ],
  
};
