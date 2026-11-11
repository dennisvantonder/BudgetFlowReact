import {
   createContext,
   useContext,
   useEffect,
   useState,
   type ReactNode,
} from "react";
import { loginRequest } from "../services/AuthService";
import UserService from "../services/UserService";
import type { User } from "../services/UserService";

type LoginRequest = {
   email: string;
   password: string;
};

type AuthContextType = {
   user: User | null;
   isAuthenticated: boolean;
   isLoading: boolean;
   login: (credentials: LoginRequest) => Promise<void>;
   logout: () => Promise<void>;
};

type AuthProviderProps = {
   children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
   const [user, setUser] = useState<User | null>(null);
   const [isLoading, setIsLoading] = useState(true);

   // Check whether the user has a valid authentication cookie.
   async function checkAuth() {
      try {
         const response = await new UserService().getUser();
         setUser(response);
      } catch {
         setUser(null);
      } finally {
         setIsLoading(false);
      }
   }

   // Check authentication when the application starts.
   useEffect(() => {
      checkAuth();
   }, []);

   // Login using the API. The API sets the HTTP-only cookie.
   async function login(credentials: LoginRequest) {
      await loginRequest(credentials);

      // Retrieve the authenticated user's information.
      await checkAuth();
   }

   // Logout and clear the authentication state.
   async function logout() {
      try {
         await new UserService().logoutUser(); // Replace with actual logout request if available
      } finally {
         setUser(null);
      }
   }

   const value: AuthContextType = {
      user,
      isAuthenticated: !!user,
      isLoading,
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
