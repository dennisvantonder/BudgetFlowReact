import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EmailInput, PasswordInput, FullNameInput } from '../components/Inputs'
import { useState } from 'react';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h2><FontAwesomeIcon icon="user-plus" style={{ color: 'var(--primary)', marginRight: '10px' }}/> Create Account</h2>
      <form className="form">
        <FullNameInput value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-primary">Create Account</button>
        <div className="auth-switch">Already have an account? <a href="/login">Log In</a></div>
      </form>
    </div>
  );
}
