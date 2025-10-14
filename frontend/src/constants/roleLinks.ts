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
    { label: 'Inicio', to: '/' },
    { label: 'Sobre Nosotros', to: '/About' },
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
    { label: 'Sobre Nosotros', to: '/About' },
  ],
  practitioner: [
    { label: 'Reportes', to: '/dashboard' },
    { label: 'Pacientes', to: '/patients' },
    { label: 'Agenda', to: '/appointments' },
    { label: 'Perfil', to: '/profile' },
    { label: 'Profesionales', to: '/practitioners' },
    { label: 'Mi cuenta', to: '/account' },
    { label: 'Inicio', to: '/' },
    { label: 'Sobre Nosotros', to: '/About' },
  ],
  patient: [
    { label: 'Perfil', to: '/profile' },
    { label: 'Profesionales', to: '/practitioners' },
    { label: 'Mi cuenta', to: '/account' },
    { label: 'Registro', to: '/encounter' },
    { label: 'Inicio', to: '/' },
    { label: 'Sobre Nosotros', to: '/About' },
  ],
  public: [
    { label: 'Inicio', to: '/' },
    { label: 'Sobre Nosotros', to: '/About' },
  ],
  
};
