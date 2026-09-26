
import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="brand">
          <div className="brand-icon">🔐</div>
          <h1>Password Manager</h1>
          <p>Create your secure password vault.</p>
        </div>

        <div className="welcome">
          <h2>Create your account</h2>
          <p>Set up your account to start managing your passwords.</p>
        </div>

        <form>

          <div className="input-group">
            <label>Full name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="input-group">
            <label>Email address</label>

            <input
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="input-group">
            <label>Master password</label>

            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong master password"
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

          <div className="input-group">
            <label>Confirm master password</label>

            <div className="password-input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your master password"
                required
              />

              <button
                type="button"
                className="show-password"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button className="login-button" type="submit">
            Create account
          </button>

        </form>

        <div className="register">
          <p>
            Already have an account?
            <Link to="/" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>

        <div className="security-note">
          <span>🔒</span>
          <p>Your master password protects your secure vault.</p>
        </div>

      </div>
    </div>
  );
}

export default Register;

