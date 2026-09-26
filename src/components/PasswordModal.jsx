import { useState } from "react";
import "../App.css";

function PasswordModal({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="modal-overlay">
      <div className="password-modal">

        <div className="modal-header">
          <div>
            <h2>Add password</h2>
            <p>Save a new login to your vault.</p>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="modal-input-group">
          <label>Website / App</label>

          <input
            type="text"
            placeholder="e.g. Google"
          />
        </div>

        <div className="modal-input-group">
          <label>Username / Email</label>

          <input
            type="text"
            placeholder="e.g. you@example.com"
          />
        </div>

        <div className="modal-input-group">
          <label>Password</label>

          <div className="modal-password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="modal-input-group">
          <label>Category</label>

          <select>
            <option>Social</option>
            <option>Work</option>
            <option>Finance</option>
            <option>Shopping</option>
            <option>Entertainment</option>
            <option>Other</option>
          </select>
        </div>

        <div className="modal-input-group">
          <label>Notes</label>

          <textarea
            placeholder="Add optional notes..."
            rows="3"
          ></textarea>
        </div>

        <div className="modal-actions">
          <button
            className="cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button className="save-password-button">
            Save password
          </button>
        </div>

      </div>
    </div>
  );
}

export default PasswordModal;