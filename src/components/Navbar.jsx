function Navbar({ title, subtitle }) {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : { name: "User", email: "" };

  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <header className="dashboard-header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="profile">
        <div className="profile-avatar">
          {initial}
        </div>

        <div>
          <strong>{user.name}</strong>
          <span>{user.email || "Personal account"}</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;