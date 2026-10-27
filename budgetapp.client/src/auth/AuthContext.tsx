import { createContext, useContext, useState, type ReactNode } from "react";

type AuthContextType = {
   token: string | null;
   isAuthenticated: boolean;
   login: (token: string) => void;
   logout: () => void;
};

type AuthProviderProps = {
   children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
   const [token, setToken] = useState<string | null>(() =>
      localStorage.getItem("authToken"),
   );

   function login(newToken: string) {
      localStorage.setItem("authToken", newToken);
      setToken(newToken);
   }

   function logout() {
      localStorage.removeItem("authToken");
      setToken(null);
   }

   const value: AuthContextType = {
      token,
      isAuthenticated: !!token,
      login,
      logout,
   };

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
   const context = useContext(AuthContext);

   if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
   }

   return context;
}
