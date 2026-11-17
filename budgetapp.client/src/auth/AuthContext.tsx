import {
   createContext,
   useContext,
   useEffect,
   useState,
   type ReactNode,
} from "react";
import { loginRequest, getUser, logoutRequest } from "../services/AuthService";
import type { User } from "../services/AuthService";

type LoginRequest = {
   email: string;
   password: string;
};

type AuthContextType = {
   user: User | null;
   isAuthenticated: boolean;
   isLoading: boolean;
   error: string | null;
   login: (credentials: LoginRequest) => Promise<void>;
   logout: () => Promise<void>;
   clearError: () => void;
};

type AuthProviderProps = {
   children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
   const [user, setUser] = useState<User | null>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   const checkAuth = async () => {
      try {
         setError(null);
         const response = await getUser();
         setUser(response);
      } catch (err: any) {
         setUser(null);
         const errorMessage =
            err?.response?.data?.message || "Failed to verify authentication";
         console.error("Auth check failed:", errorMessage);
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      checkAuth();
   }, []);

   const login = async (credentials: LoginRequest) => {
      try {
         setError(null);
         setIsLoading(true);
         await loginRequest(credentials);
         await checkAuth();
      } catch (err: any) {
         const errorMessage = "Login failed. Please try again.";
         setError(errorMessage);
         setUser(null);
         throw err;
      } finally {
         setIsLoading(false);
      }
   };

   const logout = async () => {
      try {
         setError(null);
         await logoutRequest();
      } catch (err: any) {
         const errorMessage = err?.response?.data?.message || "Logout failed";
         console.error("Logout error:", errorMessage);
      } finally {
         setUser(null);
      }
   };

   const clearError = () => setError(null);

   const value: AuthContextType = {
      user,
      isAuthenticated: !!user,
      isLoading,
      error,
      login,
      logout,
      clearError,
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
