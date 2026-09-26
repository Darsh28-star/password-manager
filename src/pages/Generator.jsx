import { useState } from "react";
import "../App.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Generator() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("K8!mP2@xL9#qR4$v");

  const generatePassword = () => {
    let characters = "";

    if (uppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) characters += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) characters += "0123456789";
    if (symbols) characters += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!characters) {
      setPassword("");
      return;
    }

    let generated = "";

    for (let i = 0; i < length; i++) {
      generated += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    setPassword(generated);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="dashboard-page">

      {/* Sidebar */}
      <Sidebar />


      {/* Main */}
      <main className="dashboard-main">

        <Navbar
  title="Password Generator"
  subtitle="Create strong and secure passwords."
/>


        <section className="generator-container">

          {/* Generated Password */}
          <div className="generator-card">

            <div className="generator-card-header">
              <div>
                <h2>Generated password</h2>
                <p>Your secure password is ready.</p>
              </div>
            </div>

            <div className="generated-password">

              <input
                type="text"
                value={password}
                readOnly
              />

              <button onClick={copyPassword}>
                Copy
              </button>

            </div>

            <div className="password-strength generator-strength">
              Strong
            </div>

            <button
              className="generate-button"
              onClick={generatePassword}
            >
              🔄 Generate new password
            </button>

          </div>


          {/* Generator Settings */}
          <div className="generator-card">

            <h2>Password settings</h2>

            <div className="length-header">

              <label>Password length</label>

              <span>{length}</span>

            </div>

            <input
              className="length-slider"
              type="range"
              min="8"
              max="40"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />


            <div className="generator-options">

              <label className="generator-option">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) =>
                    setUppercase(e.target.checked)
                  }
                />

                <span>
                  <strong>Uppercase letters</strong>
                  <small>A-Z</small>
                </span>
              </label>


              <label className="generator-option">
                <input
                  type="checkbox"
                  checked={lowercase}
                  onChange={(e) =>
                    setLowercase(e.target.checked)
                  }
                />

                <span>
                  <strong>Lowercase letters</strong>
                  <small>a-z</small>
                </span>
              </label>


              <label className="generator-option">
                <input
                  type="checkbox"
                  checked={numbers}
                  onChange={(e) =>
                    setNumbers(e.target.checked)
                  }
                />

                <span>
                  <strong>Numbers</strong>
                  <small>0-9</small>
                </span>
              </label>


              <label className="generator-option">
                <input
                  type="checkbox"
                  checked={symbols}
                  onChange={(e) =>
                    setSymbols(e.target.checked)
                  }
                />

                <span>
                  <strong>Symbols</strong>
                  <small>! @ # $ %</small>
                </span>
              </label>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Generator;