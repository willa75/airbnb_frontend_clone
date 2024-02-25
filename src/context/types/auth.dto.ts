import { MyProfile } from "../../types/profile";

export type AuthContextType = {
  user: MyProfile | null;
  login(username: string, password: string): Promise<void>;
  logout(): Promise<any>;
  isAuthenticated: boolean;
  loading: boolean;
};
