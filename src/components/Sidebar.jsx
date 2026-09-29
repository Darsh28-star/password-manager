import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-icon">🔐</div>
        <span>VaultX</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span>▦</span>
          Dashboard
        </NavLink>

        <NavLink
          to="/vault"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span>🔑</span>
          Vault
        </NavLink>

        <NavLink
          to="/generator"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span>⚡</span>
          Password Generator
        </NavLink>

        <NavLink
          to="/security"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span>🛡</span>
          Security
        </NavLink>

        <NavLink
          to="/settings"
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
  );
}

export default Sidebar;