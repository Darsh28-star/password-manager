import { Link } from "react-router-dom";
import "../App.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div className="dashboard-page">
      <Sidebar />

      {/* Sidebar */}
      <Sidebar />


      {/* Main Dashboard */}
      <main className="dashboard-main">

        {/* Header */}
        <Navbar
  title="Good evening, Darsh 👋"
  subtitle="Here's what's happening with your passwords."
/>


        {/* Statistics */}
        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon">
              🔐
            </div>

            <div>
              <span>Total passwords</span>
              <h2>24</h2>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              🛡
            </div>

            <div>
              <span>Strong passwords</span>
              <h2>18</h2>
            </div>

          </div>


          <div className="stat-card warning">

            <div className="stat-icon">
              ⚠
            </div>

            <div>
              <span>Weak passwords</span>
              <h2>4</h2>
            </div>

          </div>


          <div className="stat-card danger">

            <div className="stat-icon">
              ♻
            </div>

            <div>
              <span>Reused passwords</span>
              <h2>2</h2>
            </div>

          </div>

        </section>


        {/* Dashboard Content */}
        <section className="dashboard-content">


          {/* Recent Passwords */}
          <div className="recent-section">

            <div className="section-header">

              <div>
                <h2>Recent passwords</h2>
                <p>
                  Your recently added credentials.
                </p>
              </div>

              <Link to="/vault">
                View all
              </Link>

            </div>


            <div className="password-list">


              {/* Google */}
              <div className="password-item">

                <div className="website-icon google">
                  G
                </div>

                <div className="password-info">

                  <strong>Google</strong>

                  <span>
                    darsh@example.com
                  </span>

                </div>

                <span className="password-strength strong">
                  Strong
                </span>

                <button>
                  •••
                </button>

              </div>


              {/* GitHub */}
              <div className="password-item">

                <div className="website-icon github">
                  G
                </div>

                <div className="password-info">

                  <strong>GitHub</strong>

                  <span>
                    darsh123
                  </span>

                </div>

                <span className="password-strength strong">
                  Strong
                </span>

                <button>
                  •••
                </button>

              </div>


              {/* Amazon */}
              <div className="password-item">

                <div className="website-icon amazon">
                  A
                </div>

                <div className="password-info">

                  <strong>Amazon</strong>

                  <span>
                    darsh@example.com
                  </span>

                </div>

                <span className="password-strength weak">
                  Weak
                </span>

                <button>
                  •••
                </button>

              </div>


              {/* LinkedIn */}
              <div className="password-item">

                <div className="website-icon linkedin">
                  in
                </div>

                <div className="password-info">

                  <strong>LinkedIn</strong>

                  <span>
                    darsh@example.com
                  </span>

                </div>

                <span className="password-strength strong">
                  Strong
                </span>

                <button>
                  •••
                </button>

              </div>

            </div>

          </div>


          {/* Quick Actions */}
          <div className="quick-actions">

            <h2>Quick actions</h2>


            <Link
              to="/vault"
              className="action-card"
            >
              <div>🔑</div>

              <strong>
                Add password
              </strong>

              <span>
                Save a new credential
              </span>

            </Link>


            <Link
              to="/generator"
              className="action-card"
            >
              <div>🔄</div>

              <strong>
                Generate password
              </strong>

              <span>
                Create a strong password
              </span>

            </Link>


            <Link
              to="/security"
              className="action-card"
            >
              <div>🛡</div>

              <strong>
                Security check
              </strong>

              <span>
                Review your passwords
              </span>

            </Link>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;