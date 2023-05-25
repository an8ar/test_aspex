import { User } from '~/store';

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}
