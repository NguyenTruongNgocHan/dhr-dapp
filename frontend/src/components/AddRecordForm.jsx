export default function AddRecordForm({
  addRecordForm,
  setAddRecordForm,
  onSubmit,
}) {
  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Add Health Record</h3>
        <span className="chip">Clinical Data</span>
      </div>

      <div className="form-grid">
        <div>
          <label className="label">Patient Address</label>
          <input
            className="input"
            value={addRecordForm.patient}
            onChange={(e) =>
              setAddRecordForm({ ...addRecordForm, patient: e.target.value })
            }
          />
        </div>

        <div>
          <label className="label">Diagnosis</label>
          <input
            className="input"
            value={addRecordForm.diagnosis}
            onChange={(e) =>
              setAddRecordForm({ ...addRecordForm, diagnosis: e.target.value })
            }
          />
        </div>

        <div>
          <label className="label">Prescription</label>
          <input
            className="input"
            value={addRecordForm.prescription}
            onChange={(e) =>
              setAddRecordForm({
                ...addRecordForm,
                prescription: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label className="label">Note</label>
          <input
            className="input"
            value={addRecordForm.note}
            onChange={(e) =>
              setAddRecordForm({ ...addRecordForm, note: e.target.value })
            }
          />
        </div>
      </div>

      <button className="button primary" onClick={onSubmit}>
        Add Health Record
      </button>
    </div>
  );
}