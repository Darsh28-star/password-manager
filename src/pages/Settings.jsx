import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Settings() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState({ type: "", text: "" });

  // Two-factor authentication & Theme & Auto-lock states
  const [twoFactor, setTwoFactor] = useState(() => {
    return localStorage.getItem("2fa_enabled") === "true";
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("app_theme") || "Light";
  });
  const [autoLock, setAutoLock] = useState(() => {
    return localStorage.getItem("auto_lock") || "15 minutes";
  });

  // Change Password Modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdMsg, setPwdMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const u = JSON.parse(storedUser);
      setName(u.name || "");
      setEmail(u.email || "");
    }
  }, []);

  // Theme application
  useEffect(() => {
    localStorage.setItem("app_theme", theme);
    if (theme === "Dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setProfileMsg({ type: "error", text: "Name and Email are required" });
      return;
    }

    try {
      setProfileSaving(true);
      setProfileMsg({ type: "", text: "" });
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:5000/api/auth/profile",
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data && res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setProfileMsg({ type: "success", text: "Profile updated successfully!" });
      }
    } catch (err) {
      setProfileMsg({
        type: "error",
        text: err.response?.data?.message || "Failed to update profile"
      });
    } finally {
      setProfileSaving(false);
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      setPwdMsg({ type: "error", text: "Please enter current and new passwords" });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdMsg({ type: "error", text: "New passwords do not match" });
      return;
    }

    try {
      setPwdLoading(true);
      setPwdMsg({ type: "", text: "" });
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/auth/change-password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPwdMsg({ type: "success", text: "Master password changed successfully!" });
      setTimeout(() => {
        setShowPasswordModal(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPwdMsg({ type: "", text: "" });
      }, 1500);
    } catch (err) {
      setPwdMsg({
        type: "error",
        text: err.response?.data?.message || "Failed to change master password"
      });
    } finally {
      setPwdLoading(false);
    }
  };

  const handleToggle2FA = (e) => {
    const val = e.target.checked;
    setTwoFactor(val);
    localStorage.setItem("2fa_enabled", val ? "true" : "false");
  };

  const handleAutoLockChange = (e) => {
    const val = e.target.value;
    setAutoLock(val);
    localStorage.setItem("auto_lock", val);
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "WARNING: Are you sure you want to PERMANENTLY delete your account and all saved passwords? This action CANNOT be undone!"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:5000/api/auth/account", {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Your account and all vault data have been deleted.");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete account");
    }
  };

  return (
    <div className="dashboard-page">
      <Sidebar />
      <main className="dashboard-main">
        <Navbar
          title="Settings"
          subtitle="Manage your account and security preferences."
        />

        {/* Profile Section */}
        <section className="settings-section">
          <div className="settings-section-header">
            <h2>Profile</h2>
            <p>Update your personal information.</p>
          </div>

          {profileMsg.text && (
            <div
              style={{
                marginBottom: "16px",
                color: profileMsg.type === "error" ? "#ef4444" : "#10b981",
                fontWeight: "500"
              }}
            >
              {profileMsg.text}
            </div>
          )}

          <form onSubmit={handleSaveProfile}>
            <div className="settings-form-grid">
              <div className="settings-field">
                <label>Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="settings-field">
                <label>Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="settings-save-button"
              style={{ marginTop: "16px" }}
              disabled={profileSaving}
            >
              {profileSaving ? "Saving..." : "Save changes"}
            </button>
          </form>
        </section>

        {/* Security Section */}
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

            <button
              className="settings-secondary-button"
              onClick={() => setShowPasswordModal(true)}
            >
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
                onChange={handleToggle2FA}
              />
              <span></span>
            </label>
          </div>

          <div className="settings-row">
            <div>
              <strong>Active sessions</strong>
              <p>Manage devices currently signed in to your account.</p>
            </div>

            <button
              className="settings-secondary-button"
              onClick={() => alert("Current active session: 1 device (Windows)")}
            >
              Manage sessions
            </button>
          </div>
        </section>

        {/* Preferences Section */}
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

            <select
              className="settings-select"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
            </select>
          </div>

          <div className="settings-row">
            <div>
              <strong>Auto-lock vault</strong>
              <p>Automatically lock your vault after inactivity.</p>
            </div>

            <select
              className="settings-select"
              value={autoLock}
              onChange={handleAutoLockChange}
            >
              <option value="5 minutes">5 minutes</option>
              <option value="15 minutes">15 minutes</option>
              <option value="30 minutes">30 minutes</option>
              <option value="Never">Never</option>
            </select>
          </div>
        </section>

        {/* Browser Extension Section */}
        <section className="settings-section">
          <div className="settings-section-header">
            <h2>🧩 Browser Extension</h2>
            <p>Auto-detect and save passwords on any website you visit.</p>
          </div>

          <div className="settings-row" style={{ alignItems: "flex-start", flexDirection: "column", gap: "10px" }}>
            <p style={{ fontSize: "14px", color: "#4b5563", lineHeight: "1.6" }}>
              To install the VaultX extension in Google Chrome, Microsoft Edge, or Brave:
            </p>
            <ol style={{ paddingLeft: "20px", fontSize: "13px", color: "#6b7280", lineHeight: "1.7" }}>
              <li>Open <code>chrome://extensions</code> (or <code>edge://extensions</code>).</li>
              <li>Enable <strong>Developer mode</strong> in the top right corner.</li>
              <li>Click <strong>Load unpacked</strong>.</li>
              <li>Select your project's extension folder: <br />
                <code style={{ background: "#f3f4f6", padding: "2px 6px", borderRadius: "4px" }}>
                  password_manager/extension
                </code>
              </li>
            </ol>
            <div style={{ marginTop: "6px" }}>
              <span style={{ fontSize: "12px", background: "#ecfdf5", color: "#065f46", padding: "4px 8px", borderRadius: "6px", fontWeight: "600" }}>
                ✓ Ready to Load
              </span>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
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

            <button
              className="delete-account-button"
              onClick={handleDeleteAccount}
            >
              Delete account
            </button>
          </div>
        </section>
      </main>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="password-modal">
            <div className="modal-header">
              <div>
                <h2>Change Master Password</h2>
                <p>Enter your current master password and a new master password.</p>
              </div>
              <button
                className="modal-close"
                onClick={() => setShowPasswordModal(false)}
              >
                ×
              </button>
            </div>

            {pwdMsg.text && (
              <div
                style={{
                  marginBottom: "12px",
                  color: pwdMsg.type === "error" ? "#ef4444" : "#10b981",
                  fontSize: "14px"
                }}
              >
                {pwdMsg.text}
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit}>
              <div className="modal-input-group">
                <label>Current Master Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>

              <div className="modal-input-group">
                <label>New Master Password</label>
                <input
                  type="password"
                  placeholder="Enter new master password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="modal-input-group">
                <label>Confirm New Master Password</label>
                <input
                  type="password"
                  placeholder="Confirm new master password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowPasswordModal(false)}
                  disabled={pwdLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="save-password-button"
                  disabled={pwdLoading}
                >
                  {pwdLoading ? "Updating..." : "Update password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;