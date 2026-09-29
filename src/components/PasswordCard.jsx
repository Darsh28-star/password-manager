import { useState } from "react";

function PasswordCard({ id, item, website, username, password, strength, icon, onDelete, onEdit }) {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getIconText = () => {
    if (icon) return icon;
    if (website) return website.charAt(0).toUpperCase();
    return "P";
  };

  const currentItem = item || { id, _id: id, website, username, password, strength };

  return (
    <div className="vault-card">
      <div className="vault-card-top">
        <div className="website-info">
          <div className="website-icon">
            {getIconText()}
          </div>

          <div className="password-info">
            <h3>{website}</h3>
            <p>{username}</p>
            <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
              {showPassword ? password : "••••••••"}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "4px" }}>
          {onEdit && (
            <button
              className="card-menu"
              title="Edit password"
              onClick={() => onEdit(currentItem)}
              style={{ color: "#3b82f6", cursor: "pointer", border: "none", background: "transparent" }}
            >
              ✏️
            </button>
          )}
          {onDelete && (
            <button
              className="card-menu"
              title="Delete password"
              onClick={() => onDelete(id || website)}
              style={{ color: "#ef4444", cursor: "pointer", border: "none", background: "transparent" }}
            >
              🗑
            </button>
          )}
        </div>
      </div>

      <div className="vault-card-bottom">
        <span
          className={
            strength === "Strong"
              ? "password-strength strong"
              : strength === "Medium"
              ? "password-strength medium"
              : "password-strength weak"
          }
        >
          {strength || "Strong"}
        </span>

        <div style={{ display: "flex", gap: "6px" }}>
          <button
            className="view-button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "View"}
          </button>
          {password && (
            <button
              className="view-button"
              onClick={handleCopy}
              style={{ background: copied ? "#10b981" : undefined, color: copied ? "white" : undefined }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PasswordCard;