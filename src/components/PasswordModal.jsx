import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function PasswordModal({ onClose, onSuccess, initialData }) {
  const [showPassword, setShowPassword] = useState(false);
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("Social");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditMode = !!initialData;

  useEffect(() => {
    if (initialData) {
      setWebsite(initialData.website || "");
      setUsername(initialData.username || "");
      setPassword(initialData.password || "");
      setCategory(initialData.category || "Social");
      setNotes(initialData.notes || "");
    }
  }, [initialData]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!website || !username || !password) {
      setError("Website, Username, and Password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const payload = {
        website,
        username,
        password,
        category,
        notes
      };

      if (isEditMode) {
        const id = initialData.id || initialData._id;
        await axios.put(`http://localhost:5000/api/passwords/${id}`, payload, { headers });
      } else {
        await axios.post("http://localhost:5000/api/passwords", payload, { headers });
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="password-modal">

        <div className="modal-header">
          <div>
            <h2>{isEditMode ? "Edit password" : "Add password"}</h2>
            <p>{isEditMode ? "Update login details in your vault." : "Save a new login to your vault."}</p>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {error && (
          <div style={{ color: "#ef4444", marginBottom: "12px", fontSize: "14px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSave}>
          <div className="modal-input-group">
            <label>Website / App</label>
            <input
              type="text"
              placeholder="e.g. Google"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
            />
          </div>

          <div className="modal-input-group">
            <label>Username / Email</label>
            <input
              type="text"
              placeholder="e.g. you@example.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="modal-input-group">
            <label>Password</label>
            <div className="modal-password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="modal-input-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Social">Social</option>
              <option value="Work">Work</option>
              <option value="Finance">Finance</option>
              <option value="Shopping">Shopping</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="modal-input-group">
            <label>Notes</label>
            <textarea
              placeholder="Add optional notes..."
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-password-button"
              disabled={loading}
            >
              {loading ? "Saving..." : isEditMode ? "Update password" : "Save password"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default PasswordModal;