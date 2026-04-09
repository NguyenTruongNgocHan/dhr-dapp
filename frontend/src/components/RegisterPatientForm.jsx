export default function RegisterPatientForm({
  patientForm,
  setPatientForm,
  onSubmit,
}) {
  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Register Patient</h3>
        <span className="chip">Patient Flow</span>
      </div>

      <div className="form-grid">
        <div>
          <label className="label">Name</label>
          <input
            className="input"
            value={patientForm.name}
            onChange={(e) =>
              setPatientForm({ ...patientForm, name: e.target.value })
            }
          />
        </div>

        <div>
          <label className="label">DOB</label>
          <input
            className="input"
            value={patientForm.dob}
            onChange={(e) =>
              setPatientForm({ ...patientForm, dob: e.target.value })
            }
          />
        </div>

        <div>
          <label className="label">Gender</label>
          <input
            className="input"
            value={patientForm.gender}
            onChange={(e) =>
              setPatientForm({ ...patientForm, gender: e.target.value })
            }
          />
        </div>
      </div>

      <button className="button primary" onClick={onSubmit}>
        Register Patient
      </button>
    </div>
  );
}