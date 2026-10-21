import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function RegisterPage() {
  return (
    <div>
      <h2><FontAwesomeIcon icon="user-plus" style={{ color: 'var(--primary)', marginRight: '10px' }}/> Create Account</h2>
      <form className="form">
         <div className="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="Your Name" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="you@example.com" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••" />
        </div>
        <button className="btn btn-primary">Create Account</button>
        <div className="auth-switch">Already have an account? <a href="/login">Log In</a></div>
      </form>
    </div>
  );
}
