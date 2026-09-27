import { useState } from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";

import "../App.css";

import axios from "axios";


function Register() {

  const [
    showPassword,
    setShowPassword
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword
  ] = useState(false);


  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword
  ] = useState("");


  const navigate =
    useNavigate();


  const handleRegister =
    async (e) => {

      e.preventDefault();


      // Check passwords
      if (
        password !==
        confirmPassword
      ) {

        alert(
          "Passwords do not match"
        );

        return;
      }


      try {

        const response =
          await axios.post(
            "http://localhost:5000/api/auth/register",
            {
              name,
              email,
              password
            }
          );


        console.log(
          response.data
        );


        alert(
          "Registration successful"
        );


        navigate("/");

      } catch (error) {

        console.log(
          error.response?.data
        );


        alert(
          error.response?.data
            ?.message ||
          "Registration failed"
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
            Create your secure
            password vault.
          </p>

        </div>


        <div className="welcome">

          <h2>
            Create your account
          </h2>

          <p>
            Set up your account
            to start managing
            your passwords.
          </p>

        </div>


        <form
          onSubmit={handleRegister}
        >


          {/* NAME */}

          <div className="input-group">

            <label>
              Full name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              required
            />

          </div>


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

            <label>
              Master password
            </label>


            <div className="password-input">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Create a strong master password"
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


          {/* CONFIRM PASSWORD */}

          <div className="input-group">

            <label>
              Confirm master password
            </label>


            <div className="password-input">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm your master password"
                value={
                  confirmPassword
                }
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                required
              />


              <button
                type="button"
                className="show-password"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {
                  showConfirmPassword
                    ? "Hide"
                    : "Show"
                }
              </button>

            </div>

          </div>


          <button
            className="login-button"
            type="submit"
          >
            Create account
          </button>


        </form>


        <div className="register">

          <p>

            Already have an account?

            <Link
              to="/"
              className="auth-link"
            >
              Sign in
            </Link>

          </p>

        </div>


        <div className="security-note">

          <span>
            🔒
          </span>

          <p>
            Your master password
            protects your secure vault.
          </p>

        </div>


      </div>

    </div>
  );
}


export default Register;