export function roleLabel(role: string): string {
  switch (role) {
    case 'PATIENT':
      return 'Paciente';
    case 'PRACTITIONER':
      return 'Profesional';
    case 'ADMIN':
      return 'Administrador';
    default:
      return 'Sin rol';
  }
}
