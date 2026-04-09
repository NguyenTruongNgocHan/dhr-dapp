export default function StatusCards({ status, health }) {
  return (
    <section className="status-row">
      <div className="status-card">
        <span className="status-title">Current Action Status</span>
        <strong>{status}</strong>
      </div>

      <div className="status-card">
        <span className="status-title">Contract</span>
        <strong className="break-word">
          {health?.contract_address || "Not loaded"}
        </strong>
      </div>
    </section>
  );
}