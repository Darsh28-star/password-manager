import { useState } from "react";
import "../App.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Settings() {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="dashboard-page">
      <Sidebar />
      <main className="dashboard-main">
        <Navbar
  title="Settings"
  subtitle="Manage your account and security preferences."
/>

        <section className="settings-section">
          <div className="settings-section-header">
            <h2>Profile</h2>
            <p>Update your personal information.</p>
          </div>

          <div className="settings-form-grid">
            <div className="settings-field">
              <label>Full name</label>
              <input type="text" defaultValue="Darsh" />
            </div>

            <div className="settings-field">
              <label>Email address</label>
              <input type="email" defaultValue="darsh@example.com" />
            </div>
          </div>

          <button className="settings-save-button">
            Save changes
          </button>
        </section>

        <section className="settings-section">
          <div className="settings-section-header">
            <h2>Security</h2>
            <p>Manage your password and account protection.</p>
          </div>

          <div className="settings-row">
            <div>
              <strong>Master password</strong>
              <p>Change your master password regularly.</p>
            </div>

            <button className="settings-secondary-button">
              Change password
            </button>
          </div>

          <div className="settings-row">
            <div>
              <strong>Two-factor authentication</strong>
              <p>Add an extra layer of security to your account.</p>
            </div>

            <label className="toggle">
              <input
                type="checkbox"
                checked={twoFactor}
                onChange={(e) => setTwoFactor(e.target.checked)}
              />
              <span></span>
            </label>
          </div>

          <div className="settings-row">
            <div>
              <strong>Active sessions</strong>
              <p>Manage devices currently signed in to your account.</p>
            </div>

            <button className="settings-secondary-button">
              Manage sessions
            </button>
          </div>
        </section>

        <section className="settings-section">
          <div className="settings-section-header">
            <h2>Preferences</h2>
            <p>Customize your password manager experience.</p>
          </div>

          <div className="settings-row">
            <div>
              <strong>Theme</strong>
              <p>Choose how the application looks.</p>
            </div>

            <select className="settings-select">
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </div>

          <div className="settings-row">
            <div>
              <strong>Auto-lock vault</strong>
              <p>Automatically lock your vault after inactivity.</p>
            </div>

            <select className="settings-select">
              <option>5 minutes</option>
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>Never</option>
            </select>
          </div>
        </section>

        <section className="settings-section danger-zone">
          <div className="settings-section-header">
            <h2>Danger zone</h2>
            <p>Irreversible account actions.</p>
          </div>

          <div className="settings-row">
            <div>
              <strong>Delete account</strong>
              <p>
                Permanently delete your account and all vault data.
              </p>
            </div>

            <button className="delete-account-button">
              Delete account
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Settings;