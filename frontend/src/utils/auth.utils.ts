import type { User } from '../types/user.types';

const ADMIN_EMAILS = ['admin@ht.com', 'suport@ht.com'];

export const inferRoleFromEmail = (email: string): User['role'] => {
  const domain = email.split('@')[1];

  if (domain === '@ht.com') {
    return ADMIN_EMAILS.includes(email.toLowerCase())
      ? 'ADMIN'
      : 'PRACTITIONER';
  }

  return 'PATIENT';
};
