import { NavLink } from '../types/navigation';

export const roleBasedLinks: Record<string, NavLink[]> = {

  ADMIN: [
    { label: 'Reportes', to: '/dashboard' },
    { label: 'Pacientes', to: '/patients' },
    { label: 'Agenda', to: '/appointments' },
    { label: 'Perfil', to: '/profile' },
    { label: 'Profesionales', to: '/practitioners' },
    { label: 'Mi cuenta', to: '/account' },
    { label: 'Registro', to: '/encounter' },
  ], 

  PRACTITIONER: [
    { label: 'Reportes', to: '/dashboard' },
    { label: 'Pacientes', to: '/patients' },
    { label: 'Agenda', to: '/appointments' },
    { label: 'Perfil', to: '/profile' },
    { label: 'Profesionales', to: '/practitioners' },
    { label: 'Mi cuenta', to: '/account' },
  ],

  PATIENT: [
    { label: 'Perfil', to: '/profile' },
    { label: 'Profesionales', to: '/practitioners' },
    { label: 'Mi cuenta', to: '/account' },
    { label: 'Registro', to: '/encounter' },
  ],


  PUBLIC: [
    { label: 'Inicio', to: '/' },
    { label: 'Nuestros servicios', to: '/#servicios' },
    { label: 'Sobre Nosotros', to: '/About' },
    { label: 'Login', to: '/login' },
    { label: 'Register', to: '/register' },
    { label: 'Contacto', to: '/contact' },
    
  ],
  
};
