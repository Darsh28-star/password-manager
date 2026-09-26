function PasswordCard({ website, username, strength, icon }) {
  return (
    <div className="vault-card">
      <div className="vault-card-top">
        <div className="website-info">
          <div className="website-icon">
            {icon}
          </div>

          <div className="password-info">
            <h3>{website}</h3>
            <p>{username}</p>
          </div>
        </div>

        <button className="card-menu">⋮</button>
      </div>

      <div className="vault-card-bottom">
        <span
          className={
            strength === "Strong"
              ? "password-strength strong"
              : "password-strength weak"
          }
        >
          {strength}
        </span>

        <button className="view-button">
          View
        </button>
      </div>
    </div>
  );
}

export default PasswordCard;