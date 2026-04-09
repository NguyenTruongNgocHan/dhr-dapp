export default function TopHero({ health }) {
  return (
    <header className="hero">
      <div>
        <p className="eyebrow">Healthcare Blockchain Dashboard</p>
        <h2>Medical records with access control on local Ethereum</h2>
        <p className="hero-text">
          Demo end-to-end flow: register patient and doctor accounts, grant
          permissions, add health records, and query on-chain data through a
          polished medical dashboard.
        </p>
      </div>

      <div className="hero-badge">
        <span>Chain</span>
        <strong>{health?.contract_address ? "Geth Local" : "Loading..."}</strong>
      </div>
    </header>
  );
}