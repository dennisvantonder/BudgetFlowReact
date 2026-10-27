import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EmailInput, PasswordInput, FullNameInput } from "../components/Inputs";
import { PrimaryButton } from "../components/Buttons";
import { useState } from "react";
import { registerRequest } from "../services/AuthService";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function RegisterPage() {
   const [fullName, setFullName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const { login } = useAuth();

   async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
      e.preventDefault();

      setError("");
      setLoading(true);
      try {
         const response = await registerRequest({ fullName, email, password });

         // Example for a basic prototype.
         // Use a more secure token-storage strategy for production.
         login(response.token);
         localStorage.setItem("email", response.email);
         localStorage.setItem("fullName", fullName);

         // Optional: Use { replace: true } if you want to swap the current entry
         // in the history stack instead of pushing a new one (prevents going back)
         console.log("Registration successful:", response);
         navigate("/dashboard", { replace: true });
      } catch (err: any) {
         if (err.response) {
            const data = err.response.data;
            setError(
               typeof data === "string"
                  ? data
                  : (data?.message ??
                       "Registration Failed, Check your credentials."),
            );
         } else {
            setError(
               "Could not connect to the server. Please try again later.",
            );
         }
      } finally {
         setLoading(false);
      }
   }

   return (
      <div>
         <h2>
            <FontAwesomeIcon
               icon="user-plus"
               style={{ color: "var(--primary)", marginRight: "10px" }}
            />{" "}
            Create Account
         </h2>
         <form className="form" onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            <FullNameInput
               value={fullName}
               onChange={(e) => setFullName(e.target.value)}
            />
            <EmailInput
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            <PrimaryButton type="submit">
               {loading ? "Creating Account..." : "Create Account"}
            </PrimaryButton>
            <div className="auth-switch">
               Already have an account? <a href="/login">Log In</a>
            </div>
         </form>
      </div>
   );
}
