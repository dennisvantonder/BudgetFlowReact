import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function LoginPage() {
  return (
    <div>
      <h2><FontAwesomeIcon icon="sign-in-alt" style={{ color: 'var(--primary)', marginRight: '10px' }}/> Welcome Back</h2>
      <form className="form">
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="you@example.com" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••" />
        </div>
        <button className="btn btn-primary">Log In</button>
        <div className="auth-switch">Don't have an account? <a href="/register">Sign Up</a></div>
      </form>
    </div>
  );
}
