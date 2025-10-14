export type User = {
  id: string;
  email: string;
  role: 'ADMIN' | 'SUPERADMIN' | 'PATIENT' | 'PRACTITIONER';
  name?: string;
  avatarUrl?: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  role: User['role'];
  name?: string;
};


export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user?: User;
  mfaRequired?: boolean;
  tempToken?: string;
  userId?: string;
};

export type MFAResponse = {
  token: string;
  user: User;
};

export type UpdateProfilePayload = {
  name?: string;
  email?: string;
  avatarUrl?: string;
};

export type UpdatePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};


