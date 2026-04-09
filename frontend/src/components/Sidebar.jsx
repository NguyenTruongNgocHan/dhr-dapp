export default function Sidebar({
  theme,
  setTheme,
  selectedAccountKey,
  setSelectedAccountKey,
  selectedAccount,
  accounts,
  health,
}) {
  function shortAddress(addr = "") {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  }

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">+</div>
        <div>
          <h1>DHR DApp</h1>
          <p>Digital Health Records</p>
        </div>
      </div>

      <div className="sidebar-section">
        <label className="label">Current Account</label>
        <select
          className="select"
          value={selectedAccountKey}
          onChange={(e) => setSelectedAccountKey(e.target.value)}
        >
          {Object.entries(accounts).map(([key, acc]) => (
            <option key={key} value={key}>
              {acc.label} - {shortAddress(acc.sender_address)}
            </option>
          ))}
        </select>
      </div>

      <div className="account-card">
        <div className="pill">{selectedAccount.role.toUpperCase()}</div>
        <h3>{selectedAccount.label}</h3>
        <p className="muted break-word">{selectedAccount.sender_address}</p>
      </div>

      <div className="sidebar-section">
        <label className="label">Theme</label>
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "☀️ Switch to Light" : "🌙 Switch to Dark"}
        </button>
      </div>

      <div className="sidebar-section">
        <label className="label">Backend Status</label>
        <div className="health-card">
          <div className="health-dot" />
          <div>
            <strong>{health?.connected ? "Connected" : "Unknown"}</strong>
            <p className="muted">Block: {health?.block_number ?? "-"}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}