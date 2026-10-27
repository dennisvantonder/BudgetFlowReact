import { Outlet } from "react-router";

export default function AuthLayout() {
   return (
      <main className="auth-card-container">
         <section className="auth-card">
            <Outlet />
         </section>
      </main>
   );
}
