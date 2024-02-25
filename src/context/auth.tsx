import { fetchAuthSession, signIn, signOut } from "aws-amplify/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextType } from "./types/auth.dto";
import { Hub } from "aws-amplify/utils";
import { MyProfile } from "../types/profile";
import { getMyProfile } from "../data/backend";
import { AuthSession } from '@aws-amplify/core/dist/esm/singleton/Auth/types';

export const AuthContext = createContext<AuthContextType>({
  user: null,
} as AuthContextType); 

const AuthProvider= ({children}: { children: React.ReactNode }) => {
  const [user, setUser]  = useState<MyProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const login = async (
    username: string,
    password: string): Promise<void> => {
    
    await signIn({username, password});
    setIsAuthenticated(true);
    return navigate("/");
  };

  const logout = (): Promise<any> => signOut();

  Hub.listen('auth', async (data) => {
    
    switch (data.payload.event) {
      case 'signedIn':
        setIsAuthenticated(true);
        const user = await getMyProfile();
        setUser(user);
        break;
      case 'signedOut':
        setIsAuthenticated(false);
        setUser(null);
        break;
      case 'tokenRefresh_failure':
        setIsAuthenticated(false);
        setUser(null);
        break;
    }
  });

  const getSession = (): Promise< AuthSession | undefined> => fetchAuthSession();

  useEffect(() => {
    getSession().then((session) => {
      if(session && session.userSub) {
        setIsAuthenticated(true);
        return getMyProfile()
        .then((userProfile: MyProfile) => {
          setUser(userProfile);
        })
        .finally(() => setLoading(false));
      }
    });
  }, []);

  return <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;