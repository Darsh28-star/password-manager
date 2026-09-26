import { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="brand">
          <div className="brand-icon">🔐</div>
          <h1>Password Manager</h1>
          <p>Securely manage all your passwords in one place.</p>
        </div>

        <div className="welcome">
          <h2>Welcome back</h2>
          <p>Sign in to access your secure vault.</p>
        </div>

        <form>

          <div className="input-group">
            <label>Email address</label>

            <input
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="input-group">
            <div className="password-label">
              <label>Master password</label>
              <button type="button">
                Forgot password?
              </button>
            </div>

            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your master password"
                required
              />

              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="remember">
            <label>
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
          </div>

          <button className="login-button" type="submit">
            Sign in
          </button>

        </form>

        <div className="register">
          <p>
            Don't have an account?
            <Link to="/register" className="auth-link">
  Create an account
</Link>
          </p>
        </div>

        <div className="security-note">
          <span>🔒</span>
          <p>Your data is protected with secure encryption.</p>
        </div>

      </div>
    </div>
  );
}

export default Login;