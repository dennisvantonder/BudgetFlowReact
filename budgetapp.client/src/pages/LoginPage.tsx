import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EmailInput, PasswordInput } from '../components/Inputs'
import { PrimaryButton } from '../components/Buttons'
import { loginRequest } from '../services/AuthService';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);
    try {
      const response = await loginRequest({ email, password });

      // Optional: Use { replace: true } if you want to swap the current entry 
      // in the history stack instead of pushing a new one (prevents going back)
      console.log('Login successful:', response);
      
      login(response.token);
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      if (err.response) {
        const data = err.response.data;
        setError(typeof data === 'string' ? data : data?.message ?? "Login Failed, Check your credentials.");
      } else {
        setError("Could not connect to the server. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2><FontAwesomeIcon icon="sign-in-alt" style={{ color: 'var(--primary)', marginRight: '10px' }}/> Welcome Back</h2>
      <form className="form" onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
        <PrimaryButton type="submit">
          {loading ? 'Logging In...' : 'Log In'}
        </PrimaryButton>
        <div className="auth-switch">Don't have an account? <a href="/register">Sign Up</a></div>
      </form>
    </div>
  );
}
