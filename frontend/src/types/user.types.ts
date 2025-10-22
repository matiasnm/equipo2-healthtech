export type Identifier = {
  system: string;
  value: string;
  type: 'NATIONAL_ID' | 'PASSPORT' | 'DRIVER_LICENSE' | 'HEALTH_CARD' | 'OTHER';
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
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  birthday: string;
  identifiers: Identifier[];
};

export type User = {
  id: number;
  email: string;
  role: 'ADMIN' | 'PATIENT' | 'PRACTITIONER';
  status: boolean;
  userProfile?: UserProfile;
  relatedPersons?: RelatedPerson[];
  name?: string;
  avatarUrl?: string;
};


export type RegisterPayload = {
  email: string;
  password: string;
  confirmPassword: string;
  role: 'ADMIN' | 'PATIENT' | 'PRACTITIONER';
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

export type CreateProfilePayload = {
  fullName: string;
  phone: string;
  address: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  birthday: string;
  identifiers?: {
    system: string;
    value: string;
    type: 'NATIONAL_ID' | 'PASSPORT' | 'DRIVER_LICENSE' | 'HEALTH_CARD' | 'OTHER';
  }[];
};

export type UpdateProfilePayload = {
  fullName: string;
  phone: string;
  address: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  birthday: string;
};

export type UpdatePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};


