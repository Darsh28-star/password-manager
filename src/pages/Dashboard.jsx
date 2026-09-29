import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PasswordCard from "../components/PasswordCard";
import PasswordModal from "../components/PasswordModal";

function Dashboard() {
  const [passwords, setPasswords] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      const headers = { Authorization: `Bearer ${token}` };

      const [userRes, passRes] = await Promise.all([
        axios.get("http://localhost:5000/api/auth/me", { headers }).catch(() => null),
        axios.get("http://localhost:5000/api/passwords", { headers }).catch(() => ({ data: [] }))
      ]);

      if (userRes && userRes.data) {
        setUser(userRes.data);
        localStorage.setItem("user", JSON.stringify(userRes.data));
      }

      if (passRes && passRes.data) {
        setPasswords(passRes.data);
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleDeletePassword = async (id) => {
    if (!window.confirm("Are you sure you want to delete this password?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/passwords/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchDashboardData();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete password");
    }
  };

  const handleEditPassword = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const totalPasswords = passwords.length;
  const strongPasswords = passwords.filter((p) => p.strength === "Strong").length;
  const weakPasswords = passwords.filter((p) => p.strength === "Weak").length;

  const passwordCounts = {};
  passwords.forEach((p) => {
    if (p.password) {
      passwordCounts[p.password] = (passwordCounts[p.password] || 0) + 1;
    }
  });
  const reusedPasswords = Object.values(passwordCounts).filter((c) => c > 1).reduce((acc, c) => acc + c, 0);

  const userName = user?.name || (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).name : "User");

  return (
    <div className="dashboard-page">
      <Sidebar />

      <main className="dashboard-main">
        <Navbar
          title={`Good day, ${userName} 👋`}
          subtitle="Here's what's happening with your passwords."
        />

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🔐</div>
            <div>
              <span>Total passwords</span>
              <h2>{totalPasswords}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🛡</div>
            <div>
              <span>Strong passwords</span>
              <h2>{strongPasswords}</h2>
            </div>
          </div>

          <div className="stat-card warning">
            <div className="stat-icon">⚠</div>
            <div>
              <span>Weak passwords</span>
              <h2>{weakPasswords}</h2>
            </div>
          </div>

          <div className="stat-card danger">
            <div className="stat-icon">♻</div>
            <div>
              <span>Reused passwords</span>
              <h2>{reusedPasswords}</h2>
            </div>
          </div>
        </section>

        <section className="dashboard-content">
          <div className="recent-section">
            <div className="section-header">
              <div>
                <h2>Recent passwords</h2>
                <p>Your recently added credentials.</p>
              </div>

              <Link to="/vault">View all</Link>
            </div>

            {loading ? (
              <p style={{ padding: "20px", color: "#6b7280" }}>Loading passwords...</p>
            ) : passwords.length === 0 ? (
              <div style={{ padding: "30px", textAlign: "center", color: "#6b7280" }}>
                <p>No passwords stored yet in your vault.</p>
                <button
                  className="add-password-button"
                  style={{ marginTop: "12px" }}
                  onClick={handleOpenAddModal}
                >
                  + Add your first password
                </button>
              </div>
            ) : (
              <div className="vault-grid" style={{ marginTop: "16px" }}>
                {passwords.slice(0, 4).map((p) => (
                  <PasswordCard
                    key={p.id || p._id}
                    id={p.id || p._id}
                    item={p}
                    website={p.website}
                    username={p.username}
                    password={p.password}
                    strength={p.strength}
                    onDelete={handleDeletePassword}
                    onEdit={handleEditPassword}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="quick-actions">
            <h2>Quick actions</h2>

            <button
              onClick={handleOpenAddModal}
              className="action-card"
              style={{ width: "100%", textAlign: "left", background: "white", border: "1px solid #e5e7eb", cursor: "pointer" }}
            >
              <div>🔑</div>
              <strong>Add password</strong>
              <span>Save a new credential</span>
            </button>

            <Link to="/generator" className="action-card">
              <div>🔄</div>
              <strong>Generate password</strong>
              <span>Create a strong password</span>
            </Link>

            <Link to="/security" className="action-card">
              <div>🛡</div>
              <strong>Security check</strong>
              <span>Review your passwords</span>
            </Link>
          </div>
        </section>
      </main>

      {showModal && (
        <PasswordModal
          initialData={editingItem}
          onClose={() => {
            setShowModal(false);
            setEditingItem(null);
          }}
          onSuccess={fetchDashboardData}
        />
      )}
    </div>
  );
}

export default Dashboard;