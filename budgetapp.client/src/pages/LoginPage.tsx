import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EmailInput, PasswordInput } from "../components/Inputs";
import { PrimaryButton } from "../components/Buttons";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router";

export default function LoginPage() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const { error, clearError, isAuthenticated, login, isLoading } = useAuth();
   const navigate = useNavigate();

   useEffect(() => {
      if (isAuthenticated) {
         navigate("/dashboard", { replace: true });
      }
   }, [isAuthenticated, navigate]);

   async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
      e.preventDefault();
      clearError();

      try {
         await login({ email, password });
      } catch (err) {
         console.error("Login error:", err);
      }
   }

   return (
      <div>
         <h2>
            <FontAwesomeIcon
               icon="sign-in-alt"
               style={{ color: "var(--primary)", marginRight: "10px" }}
            />{" "}
            Welcome Back
         </h2>
         <form className="form" onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            <EmailInput
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               disabled={isLoading}
            />
            <PasswordInput
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               disabled={isLoading}
            />
            <PrimaryButton type="submit" disabled={isLoading}>
               {isLoading ? "Logging In..." : "Log In"}
            </PrimaryButton>
            <div className="auth-switch">
               Don't have an account? <a href="/register">Sign Up</a>
            </div>
         </form>
      </div>
   );
}
