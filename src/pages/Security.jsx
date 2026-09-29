import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Security() {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/passwords", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPasswords(res.data || []);
      } catch (err) {
        console.error("Failed to load security stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPasswords();
  }, []);

  const total = passwords.length;
  const strong = passwords.filter((p) => p.strength === "Strong").length;
  const weak = passwords.filter((p) => p.strength === "Weak").length;

  const passwordCounts = {};
  passwords.forEach((p) => {
    if (p.password) {
      passwordCounts[p.password] = (passwordCounts[p.password] || 0) + 1;
    }
  });
  const reused = Object.values(passwordCounts).filter((c) => c > 1).reduce((acc, c) => acc + c, 0);

  // Compute security score out of 100
  let score = 100;
  if (total > 0) {
    const weakPenalty = (weak / total) * 40;
    const reusedPenalty = (reused / total) * 40;
    score = Math.max(0, Math.round(100 - weakPenalty - reusedPenalty));
  }

  return (
    <div className="dashboard-page">
      <Sidebar />

      <main className="dashboard-main">
        <Navbar
          title="Security"
          subtitle="Monitor and improve your password security."
        />

        {/* Security Score */}
        <section className="security-overview">
          <div className="security-score-card">
            <div className="score-circle">
              <strong>{loading ? "--" : score}</strong>
              <span>/100</span>
            </div>

            <div className="score-info">
              <h2>{score >= 80 ? "Good security" : score >= 50 ? "Moderate security" : "Action required"}</h2>
              <p>
                {total === 0
                  ? "Add passwords to your vault to monitor your security score."
                  : score >= 80
                  ? "Your vault is in good shape, but keep your passwords updated!"
                  : "We found security issues with some of your stored passwords."}
              </p>
            </div>
          </div>

          <div className="security-stats">
            <div className="security-stat">
              <span>Strong passwords</span>
              <strong>{strong}</strong>
            </div>

            <div className="security-stat warning-stat">
              <span>Weak passwords</span>
              <strong>{weak}</strong>
            </div>

            <div className="security-stat danger-stat">
              <span>Reused passwords</span>
              <strong>{reused}</strong>
            </div>
          </div>
        </section>

        {/* Security Issues */}
        <section className="security-section">
          <div className="security-section-header">
            <div>
              <h2>Security issues</h2>
              <p>Passwords that need your attention.</p>
            </div>
          </div>

          {weak > 0 && (
            <div className="security-issue">
              <div className="issue-icon weak-icon">⚠</div>
              <div className="issue-info">
                <strong>Weak passwords</strong>
                <p>{weak} {weak === 1 ? "password is" : "passwords are"} considered weak and should be replaced.</p>
              </div>
              <Link to="/vault" className="fix-button">Fix</Link>
            </div>
          )}

          {reused > 0 && (
            <div className="security-issue">
              <div className="issue-icon reuse-icon">♻</div>
              <div className="issue-info">
                <strong>Reused passwords</strong>
                <p>{reused} {reused === 1 ? "password is" : "passwords are"} being used for multiple accounts.</p>
              </div>
              <Link to="/vault" className="fix-button">Fix</Link>
            </div>
          )}

          {strong > 0 && (
            <div className="security-issue">
              <div className="issue-icon strong-icon">✓</div>
              <div className="issue-info">
                <strong>Strong passwords</strong>
                <p>{strong} {strong === 1 ? "password meets" : "passwords meet"} security requirements.</p>
              </div>
              <span className="secure-label">Secure</span>
            </div>
          )}

          {total === 0 && !loading && (
            <p style={{ padding: "16px", color: "#6b7280" }}>No security issues detected yet.</p>
          )}
        </section>

        {/* Security Recommendations */}
        <section className="security-section">
          <div className="security-section-header">
            <div>
              <h2>Security recommendations</h2>
              <p>Follow these practices to keep your vault secure.</p>
            </div>
          </div>

          <div className="recommendation-grid">
            <div className="recommendation-card">
              <div className="recommendation-icon">🔑</div>
              <h3>Use unique passwords</h3>
              <p>Avoid using the same password across multiple websites.</p>
            </div>

            <div className="recommendation-card">
              <div className="recommendation-icon">🛡</div>
              <h3>Use strong passwords</h3>
              <p>Use long passwords containing letters, numbers and symbols.</p>
            </div>

            <div className="recommendation-card">
              <div className="recommendation-icon">🔄</div>
              <h3>Update old passwords</h3>
              <p>Replace passwords that have been reused or exposed.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Security;