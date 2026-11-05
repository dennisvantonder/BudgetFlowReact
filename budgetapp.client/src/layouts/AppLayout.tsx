import { NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AppLayout() {
   const { logout } = useAuth();
   const navigate = useNavigate();
   const fullName = localStorage.getItem("fullName");
   const email = localStorage.getItem("email");

   function handleLogout() {
      logout();
      navigate("/login", { replace: true });
   }

   return (
      <div>
         <aside className="sidebar">
            <div className="sidebar-brand">
               <FontAwesomeIcon icon="wallet" />
               <span>
                  Budget<span style={{ color: "var(--primary)" }}>Flow</span>
               </span>
            </div>

            <nav className="sidebar-nav">
               <NavLink to="/dashboard">
                  <FontAwesomeIcon icon="chart-pie" />
                  Dashboard
               </NavLink>
               <NavLink to="/transactions">
                  <FontAwesomeIcon icon="list-ul" />
                  Transactions
               </NavLink>
               <NavLink to="/categories">
                  <FontAwesomeIcon icon="tags" />
                  Categories
               </NavLink>
            </nav>

            <div className="sidebar-footer">
               <div className="user-info">
                  <div className="avatar">{fullName?.[0] ?? "U"}</div>
                  <div>
                     <div className="name">{fullName ?? "Unknown User"}</div>
                     <div className="email">
                        {email ?? "unknown@example.com"}
                     </div>
                  </div>
               </div>
               <button className="logout-btn" onClick={handleLogout}>
                  <FontAwesomeIcon icon="sign-out-alt" /> Logout
               </button>
            </div>
         </aside>

         <main className="main-content">
            <Outlet />
         </main>
      </div>
   );
}
