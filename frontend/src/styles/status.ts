export function getStatusClasses(status: string) {
  switch (status.toLowerCase()) {
    case 'COMPLETED':
      return 'bg-[var(--color-success)] text-[var(--color-base)]';
    case 'SCHEDULED':
      return 'bg-[var(--color-info)] text-[var(--color-base)]';
    case 'CANCELLED':
      return 'bg-[var(--color-error)] text-[var(--color-base)]';
    case 'NO_SHOW':
      return 'bg-[var(--color-warning)] text-[var(--color-base)]';
    default:
      return 'bg-[var(--color-secondary)] text-[var(--color-base)]';
  }
}
