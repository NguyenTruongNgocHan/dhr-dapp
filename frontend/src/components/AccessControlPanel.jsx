export default function AccessControlPanel({
  grantForm,
  setGrantForm,
  onGrant,
  onRevoke,
}) {
  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Access Control</h3>
        <span className="chip">Permissions</span>
      </div>

      <div className="form-grid">
        <div>
          <label className="label">Doctor Address</label>
          <input
            className="input"
            value={grantForm.doctor}
            onChange={(e) =>
              setGrantForm({ ...grantForm, doctor: e.target.value })
            }
          />
        </div>
      </div>

      <div className="button-row">
        <button className="button primary" onClick={onGrant}>
          Grant Access
        </button>

        <button className="button secondary" onClick={onRevoke}>
          Revoke Access
        </button>
      </div>
    </div>
  );
}