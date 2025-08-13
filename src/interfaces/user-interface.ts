export interface AuthFormInterface {
  name: string;
  email: string;
  password: string;
  telephone: string;
  city: string;
  region: string;
}

export interface UserInterface {
  user: AuthFormInterface & {
    isSignedIn: boolean;
    role: "admin" | "city_official" | "citizen";
  };
  isLoading: boolean;
}
