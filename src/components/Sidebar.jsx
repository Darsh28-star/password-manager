import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";

function Sidebar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const closeMobile = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="mobile-topbar">
        <div className="sidebar-brand" style={{ padding: "0" }}>
          <div className="sidebar-icon">🔐</div>
          <span>VaultX</span>
        </div>
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Backdrop for Mobile */}
      {mobileOpen && (
        <div className="mobile-backdrop" onClick={closeMobile} />
      )}

      {/* Main Sidebar (Desktop + Mobile Drawer) */}
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="sidebar-icon">🔐</div>
          <span>VaultX</span>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/dashboard"
            onClick={closeMobile}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span>▦</span>
            Dashboard
          </NavLink>

          <NavLink
            to="/vault"
            onClick={closeMobile}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span>🔑</span>
            Vault
          </NavLink>

          <NavLink
            to="/generator"
            onClick={closeMobile}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span>⚡</span>
            Password Generator
          </NavLink>

          <NavLink
            to="/security"
            onClick={closeMobile}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span>🛡</span>
            Security
          </NavLink>

          <NavLink
            to="/settings"
            onClick={closeMobile}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span>⚙</span>
            Settings
          </NavLink>
        </nav>

        <div className="sidebar-bottom">
          <button className="logout-button" onClick={handleLogout}>
            <span>↪</span>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;