import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute() {
   const { isAuthenticated, isLoading } = useAuth();

   if (isLoading) {
      return <div>Loading...</div>;
   }

   if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
   }

   return <Outlet />;
}
