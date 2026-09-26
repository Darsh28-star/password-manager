import { useState } from "react";
import "../App.css";
import Sidebar from "../components/Sidebar";
import PasswordCard from "../components/PasswordCard";
import PasswordModal from "../components/PasswordModal";
import Navbar from "../components/Navbar";

function Vault() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="dashboard-page">

      <Sidebar />

      <main className="dashboard-main">

        <div className="vault-header">
  <Navbar
    title="Password Vault"
    subtitle="Store and manage your passwords securely."
  />

  <button
    className="add-password-button"
    onClick={() => setShowModal(true)}
  >
    + Add password
  </button>
</div>

        <div className="vault-toolbar">

          <div className="search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search passwords..."
            />
          </div>

          <select className="category-filter">
            <option>All categories</option>
            <option>Social</option>
            <option>Work</option>
            <option>Finance</option>
            <option>Shopping</option>
            <option>Entertainment</option>
          </select>

        </div>

        <div className="vault-categories">

          <button className="category active">
            All <span>24</span>
          </button>

          <button className="category">
            Social <span>6</span>
          </button>

          <button className="category">
            Work <span>5</span>
          </button>

          <button className="category">
            Finance <span>4</span>
          </button>

          <button className="category">
            Shopping <span>5</span>
          </button>

          <button className="category">
            Entertainment <span>4</span>
          </button>

        </div>

        <div className="vault-grid">

          <PasswordCard
            website="Google"
            username="darsh@example.com"
            strength="Strong"
            icon="G"
          />

          <PasswordCard
            website="GitHub"
            username="darsh123"
            strength="Strong"
            icon="GH"
          />

          <PasswordCard
            website="Amazon"
            username="darsh@example.com"
            strength="Weak"
            icon="A"
          />

          <PasswordCard
            website="LinkedIn"
            username="darsh@example.com"
            strength="Strong"
            icon="in"
          />

        </div>

      </main>

      {showModal && (
        <PasswordModal
          onClose={() => setShowModal(false)}
        />
      )}

    </div>
  );
}

export default Vault;