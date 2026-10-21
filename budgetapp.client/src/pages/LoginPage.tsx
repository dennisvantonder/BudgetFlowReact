import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EmailInput, PasswordInput } from '../components/Inputs'

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h2><FontAwesomeIcon icon="sign-in-alt" style={{ color: 'var(--primary)', marginRight: '10px' }}/> Welcome Back</h2>
      <form className="form">
        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-primary">Log In</button>
        <div className="auth-switch">Don't have an account? <a href="/register">Sign Up</a></div>
      </form>
    </div>
  );
}
