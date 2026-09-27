import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import "../App.css";

import axios from "axios";


function Login() {

  const [
    showPassword,
    setShowPassword
  ] = useState(false);


  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");


  const navigate =
    useNavigate();


  const handleLogin =
    async (e) => {

      e.preventDefault();


      try {

        const response =
          await axios.post(
            "http://localhost:5000/api/auth/login",
            {
              email,
              password
            }
          );


        console.log(
          response.data
        );


        // Get JWT
        const token =
          response.data.token;


        // Store JWT
        localStorage.setItem(
          "token",
          token
        );


        alert(
          "Login successful"
        );


        navigate(
          "/dashboard"
        );


      } catch (error) {

        console.log(
          error.response?.data
        );


        alert(
          error.response?.data
            ?.message ||
          "Login failed"
        );

      }

    };


  return (

    <div className="login-page">

      <div className="login-card">


        <div className="brand">

          <div className="brand-icon">
            🔐
          </div>

          <h1>
            Password Manager
          </h1>

          <p>
            Securely manage all
            your passwords in one place.
          </p>

        </div>


        <div className="welcome">

          <h2>
            Welcome back
          </h2>

          <p>
            Sign in to access
            your secure vault.
          </p>

        </div>


        <form
          onSubmit={handleLogin}
        >


          {/* EMAIL */}

          <div className="input-group">

            <label>
              Email address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="input-group">

            <div className="password-label">

              <label>
                Master password
              </label>

              <button
                type="button"
              >
                Forgot password?
              </button>

            </div>


            <div className="password-input">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your master password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />


              <button
                type="button"
                className="show-password"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {
                  showPassword
                    ? "Hide"
                    : "Show"
                }
              </button>

            </div>

          </div>


          {/* REMEMBER ME */}

          <div className="remember">

            <label>

              <input
                type="checkbox"
              />

              <span>
                Remember me
              </span>

            </label>

          </div>


          {/* LOGIN */}

          <button
            className="login-button"
            type="submit"
          >
            Sign in
          </button>


        </form>


        <div className="register">

          <p>

            Don't have an account?

            <Link
              to="/register"
              className="auth-link"
            >
              Create an account
            </Link>

          </p>

        </div>


        <div className="security-note">

          <span>
            🔒
          </span>

          <p>
            Your data is protected
            with secure encryption.
          </p>

        </div>


      </div>

    </div>

  );
}


export default Login;