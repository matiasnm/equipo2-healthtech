export type Identifier = {
  system: string;
  value: string;
  type: 'NATIONAL_ID' | string;
  userId?: number;
  relatedPersonId?: number;
};
 
export type RelatedPerson = {
  id: number;
  userId: number;
  type: 'NEXT_OF_KIN' | string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  identifiers: Identifier[];
};

export type UserProfile = {
  id: number;
  fullName: string;
  phone: string;
  address: string;
  gender: string;
  birthday: string;
  identifiers: Identifier[];
};

export type User = {
  id: number;
  email: string;
  role: 'ADMIN' | 'SUPERADMIN' | 'PATIENT' | 'PRACTITIONER';
  status: boolean;
  userProfile?: UserProfile;
  relatedPersons?: RelatedPerson[];
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
  login: {
    token: string;
    refreshToken: string;
    mfaRequired: boolean;
  };
  user: User;
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


