export default function RegisterDoctorForm({
  doctorForm,
  setDoctorForm,
  onSubmit,
}) {
  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Register Doctor</h3>
        <span className="chip">Doctor Flow</span>
      </div>

      <div className="form-grid">
        <div>
          <label className="label">Doctor Name</label>
          <input
            className="input"
            value={doctorForm.name}
            onChange={(e) =>
              setDoctorForm({ ...doctorForm, name: e.target.value })
            }
          />
        </div>

        <div>
          <label className="label">Specialty</label>
          <input
            className="input"
            value={doctorForm.specialty}
            onChange={(e) =>
              setDoctorForm({ ...doctorForm, specialty: e.target.value })
            }
          />
        </div>
      </div>

      <button className="button primary" onClick={onSubmit}>
        Register Doctor
      </button>
    </div>
  );
}