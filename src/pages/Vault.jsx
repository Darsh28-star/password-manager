/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import Sidebar from "../components/Sidebar";
import PasswordCard from "../components/PasswordCard";
import PasswordModal from "../components/PasswordModal";
import Navbar from "../components/Navbar";

function Vault() {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchPasswords = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get("http://localhost:5000/api/passwords", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPasswords(response.data || []);
    } catch (err) {
      console.error("Failed to fetch passwords:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const handleDeletePassword = async (id) => {
    if (!window.confirm("Are you sure you want to delete this password?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/passwords/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPasswords();
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

  const getCategoryCount = (cat) => {
    if (cat === "All") return passwords.length;
    return passwords.filter((p) => p.category === cat).length;
  };

  const categories = ["All", "Social", "Work", "Finance", "Shopping", "Entertainment", "Other"];

  const filteredPasswords = passwords.filter((p) => {
    const matchesSearch =
      p.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            onClick={handleOpenAddModal}
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All categories</option>
            <option value="Social">Social</option>
            <option value="Work">Work</option>
            <option value="Finance">Finance</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="vault-categories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={selectedCategory === cat ? "category active" : "category"}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat} <span>{getCategoryCount(cat)}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ padding: "20px", color: "#6b7280" }}>Loading vault...</p>
        ) : filteredPasswords.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>
            <p>No passwords found.</p>
          </div>
        ) : (
          <div className="vault-grid">
            {filteredPasswords.map((p) => (
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
      </main>

      {showModal && (
        <PasswordModal
          initialData={editingItem}
          onClose={() => {
            setShowModal(false);
            setEditingItem(null);
          }}
          onSuccess={fetchPasswords}
        />
      )}
    </div>
  );
}

export default Vault;