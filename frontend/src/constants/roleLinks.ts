import { NavLink } from '../types/navigation';

export const roleBasedLinks: Record<string, NavLink[]> = {

  admin: [
    { label: 'Reportes', to: '/dashboard' },
    { label: 'Pacientes', to: '/patients' },
    { label: 'Agenda', to: '/appointments' },
    { label: 'Perfil', to: '/profile' },
    { label: 'Profesionales', to: '/practitioners' },
    { label: 'Mi cuenta', to: '/account' },
    { label: 'Registro', to: '/encounter' },

  ],
  practitioner: [
    { label: 'Reportes', to: '/dashboard' },
    { label: 'Pacientes', to: '/patients' },
    { label: 'Agenda', to: '/appointments' },
    { label: 'Perfil', to: '/profile' },
    { label: 'Profesionales', to: '/practitioners' },
    { label: 'Mi cuenta', to: '/account' },

  ],
  patient: [
    { label: 'Perfil', to: '/profile' },
    { label: 'Profesionales', to: '/practitioners' },
    { label: 'Mi cuenta', to: '/account' },
    { label: 'Registro', to: '/encounter' },

  ],
  public: [
    { label: 'Inicio', to: '/' },
    { label: 'Sobre Nosotros', to: '/About' },
  ],
  
};
