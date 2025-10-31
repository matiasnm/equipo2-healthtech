export function formatWithLocalOffset(d: Date) {
  const pad = (n: number) => String(n).padStart(2, '0');

  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());

  const offsetMin = d.getTimezoneOffset(); // minutes to add to local to get UTC
  const sign = offsetMin > 0 ? '-' : '+';
  const abs = Math.abs(offsetMin);
  const offH = pad(Math.floor(abs / 60));
  const offM = pad(abs % 60);

  return `${year}-${month}-${day}T${hours}:${minutes}${sign}${offH}:${offM}`;
}


export function formatDate(d: Date) {
  const pad = (n: number) => String(n).padStart(2, '0');

  const year = d.getFullYear();
  const month = pad(d.getMonth());
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());

  const offsetMin = d.getTimezoneOffset(); // minutes to add to local to get UTC
  const sign = offsetMin > 0 ? '-' : '+';
  const abs = Math.abs(offsetMin);
  const offH = pad(Math.floor(abs / 60));
  const offM = pad(abs % 60);

  return `${year}-${month}-${day}T${hours}:${minutes}${sign}${offH}:${offM}`;
}

export default formatWithLocalOffset;

/**
 * Construye un Date en zona local a partir de una fecha 'YYYY-MM-DD' y una hora 'HH:mm' (o 'HH:mm:ss')
 * Evita ambigüedades del parser de Date con cadenas ISO sin timezone.
 */
export function buildLocalDate(dateStr: string, timeStr: string) {
  const [ys, ms, ds] = (dateStr || '').split('-');
  const y = parseInt(ys || '', 10) || new Date().getFullYear();
  const m = parseInt(ms || '1', 10) || 1;
  const d = parseInt(ds || '1', 10) || 1;

  const [ths, tms] = (timeStr || '').split(':');
  const hh = parseInt(ths || '0', 10) || 0;
  const mm = parseInt(tms || '0', 10) || 0;

  // monthIndex en Date es 0-based
  return new Date(y, m - 1, d, hh, mm, 0, 0);
}
