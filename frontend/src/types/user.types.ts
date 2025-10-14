export type User = {
  id: string;
  email: string;
  role: 'superAdmin' |'admin' | 'practitioner' | 'patient';
};

export type LoginCredentials = {
  email: string;
  password: string;
};