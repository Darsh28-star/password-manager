import { Link } from "react-router-dom";
import "../App.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Security() {
  return (
    <div className="dashboard-page">

        {/* Sidebar */}
        <Sidebar />


      {/* Main */}
      <main className="dashboard-main">

        <Navbar
  title="Security"
  subtitle="Monitor and improve your password security."
/>


        {/* Security Score */}
        <section className="security-overview">

          <div className="security-score-card">

            <div className="score-circle">
              <strong>82</strong>
              <span>/100</span>
            </div>

            <div className="score-info">
              <h2>Good security</h2>

              <p>
                Your vault is in good shape, but there are
                a few things you can improve.
              </p>
            </div>

          </div>


          <div className="security-stats">

            <div className="security-stat">
              <span>Strong passwords</span>
              <strong>18</strong>
            </div>

            <div className="security-stat warning-stat">
              <span>Weak passwords</span>
              <strong>4</strong>
            </div>

            <div className="security-stat danger-stat">
              <span>Reused passwords</span>
              <strong>2</strong>
            </div>

          </div>

        </section>


        {/* Security Issues */}
        <section className="security-section">

          <div className="security-section-header">

            <div>
              <h2>Security issues</h2>

              <p>
                Passwords that need your attention.
              </p>
            </div>

          </div>


          <div className="security-issue">

            <div className="issue-icon weak-icon">
              ⚠
            </div>

            <div className="issue-info">

              <strong>Weak passwords</strong>

              <p>
                4 passwords are considered weak and
                should be replaced.
              </p>

            </div>

            <Link to="/vault" className="fix-button">
              Fix
            </Link>

          </div>


          <div className="security-issue">

            <div className="issue-icon reuse-icon">
              ♻
            </div>

            <div className="issue-info">

              <strong>Reused passwords</strong>

              <p>
                2 passwords are being used for multiple
                accounts.
              </p>

            </div>

            <Link to="/vault" className="fix-button">
              Fix
            </Link>

          </div>


          <div className="security-issue">

            <div className="issue-icon strong-icon">
              ✓
            </div>

            <div className="issue-info">

              <strong>Strong passwords</strong>

              <p>
                18 passwords currently meet your
                security requirements.
              </p>

            </div>

            <span className="secure-label">
              Secure
            </span>

          </div>

        </section>


        {/* Security Recommendations */}
        <section className="security-section">

          <div className="security-section-header">

            <div>
              <h2>Security recommendations</h2>

              <p>
                Follow these practices to keep your vault secure.
              </p>
            </div>

          </div>


          <div className="recommendation-grid">

            <div className="recommendation-card">

              <div className="recommendation-icon">
                🔑
              </div>

              <h3>Use unique passwords</h3>

              <p>
                Avoid using the same password across
                multiple websites.
              </p>

            </div>


            <div className="recommendation-card">

              <div className="recommendation-icon">
                🛡
              </div>

              <h3>Use strong passwords</h3>

              <p>
                Use long passwords containing letters,
                numbers and symbols.
              </p>

            </div>


            <div className="recommendation-card">

              <div className="recommendation-icon">
                🔄
              </div>

              <h3>Update old passwords</h3>

              <p>
                Replace passwords that have been reused
                or exposed.
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Security;