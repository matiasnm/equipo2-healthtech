export type User = {
  id: string;
  email: string;
  role: 'admin' | 'medic' | 'patient';
};

export type LoginCredentials = {
  email: string;
  password: string;
};
