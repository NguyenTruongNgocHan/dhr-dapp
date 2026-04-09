export default function LookupPanel({
  lookupForm,
  setLookupForm,
  onGetPatient,
  onGetDoctor,
  onCheckAccess,
  onGetCount,
  onViewRecord,
}) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h3>Lookup & Query</h3>
        <span className="chip">Read Functions</span>
      </div>

      <div className="form-grid query-grid">
        <div>
          <label className="label">Patient Address</label>
          <input
            className="input"
            value={lookupForm.patientAddress}
            onChange={(e) =>
              setLookupForm({ ...lookupForm, patientAddress: e.target.value })
            }
          />
        </div>

        <div>
          <label className="label">Doctor Address</label>
          <input
            className="input"
            value={lookupForm.doctorAddress}
            onChange={(e) =>
              setLookupForm({ ...lookupForm, doctorAddress: e.target.value })
            }
          />
        </div>

        <div>
          <label className="label">Record Index</label>
          <input
            className="input"
            type="number"
            value={lookupForm.recordIndex}
            onChange={(e) =>
              setLookupForm({
                ...lookupForm,
                recordIndex: Number(e.target.value),
              })
            }
          />
        </div>

        <div>
          <label className="label">Viewer Address</label>
          <input
            className="input"
            value={lookupForm.viewerAddress}
            onChange={(e) =>
              setLookupForm({ ...lookupForm, viewerAddress: e.target.value })
            }
          />
        </div>
      </div>

      <div className="button-row wrap">
        <button className="button secondary" onClick={onGetPatient}>
          Get Patient
        </button>

        <button className="button secondary" onClick={onGetDoctor}>
          Get Doctor
        </button>

        <button className="button secondary" onClick={onCheckAccess}>
          Check Access
        </button>

        <button className="button secondary" onClick={onGetCount}>
          Record Count
        </button>

        <button className="button secondary" onClick={onViewRecord}>
          View Record
        </button>
      </div>
    </section>
  );
}