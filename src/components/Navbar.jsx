function Navbar({ title, subtitle }) {
  return (
    <header className="dashboard-header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="profile">
        <div className="profile-avatar">
          D
        </div>

        <div>
          <strong>Darsh</strong>
          <span>Personal account</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;