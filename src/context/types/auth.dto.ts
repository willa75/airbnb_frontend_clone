export type AuthContextType = {
  user: any | null;
  login(username: string, password: string): Promise<void>;
  logout(): Promise<any>;
  isAuthenticated: boolean;
  loading: boolean;
};
