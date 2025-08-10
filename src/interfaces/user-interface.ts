export interface AuthFormInterface {
  name: string;
  email: string;
  password: string;
  telephone: string;
  city: string;
  region: string;
}

export interface UserInterface extends AuthFormInterface {
  isAuthenticated: boolean;
  isLoading: boolean;
}
