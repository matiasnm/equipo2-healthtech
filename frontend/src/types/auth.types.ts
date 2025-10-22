import type { User } from './user.types';

export interface AuthResponse {
  login: {
    token: string;
    refreshToken: string;
    mfaRequired: boolean;
  };
  user: User;
}
