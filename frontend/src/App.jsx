import { useEffect, useMemo, useState } from "react";
import "./App.css";

import {
  healthCheck,
  registerPatient,
  registerDoctor,
  grantAccess,
  revokeAccess,
  addRecord,
  getPatient,
  getDoctor,
  getAccess,
  getRecordCount,
  getRecord,
} from "./api/dhrApi";

import Sidebar from "./components/Sidebar";
import TopHero from "./components/TopHero";
import StatusCards from "./components/StatusCards";
import RegisterPatientForm from "./components/RegisterPatientForm";
import RegisterDoctorForm from "./components/RegisterDoctorForm";
import AccessControlPanel from "./components/AccessControlPanel";
import AddRecordForm from "./components/AddRecordForm";
import LookupPanel from "./components/LookupPanel";
import ResultConsole from "./components/ResultConsole";

const ACCOUNTS = {
  patient1: {
    label: "Patient 1",
    role: "patient",
    sender_address: "0x9b4dBDFd96cC09d6fe8f21AC5989c2f8177c93e2",
    private_key: "0x60ba419959aac594e814ec896cf78aa87524647677f4d18f56274e73c88329d2",
  },
  patient2: {
    label: "Patient 2",
    role: "patient",
    sender_address: "0x1cD7D99Fe9a67d26EF561Efa0166530fB67060B2",
    private_key: "0x04f0ba31c224a7afede00c18b9fe5bd4ff3d9da891c02fa846df22f2dafa2ae7",
  },
  doctor1: {
    label: "Doctor 1",
    role: "doctor",
    sender_address: "0x77648C8A6eC699F36b5d9fB72bb1293740879B13",
    private_key: "0x6d64d48da8d2fba8b5af625323ced496672f98dd31b09e349b951e080a873a05",
  },
};

const initialPatientForm = {
  name: "Patient One",
  dob: "2003-01-01",
  gender: "Male",
};

const initialDoctorForm = {
  name: "Doctor One",
  specialty: "General",
};

const initialGrantForm = {
  doctor: ACCOUNTS.doctor1.sender_address,
};

const initialAddRecordForm = {
  patient: ACCOUNTS.patient1.sender_address,
  diagnosis: "Flu",
  prescription: "Paracetamol",
  note: "Rest 3 days",
};

const initialLookupForm = {
  patientAddress: ACCOUNTS.patient1.sender_address,
  doctorAddress: ACCOUNTS.doctor1.sender_address,
  recordIndex: 0,
  viewerAddress: ACCOUNTS.patient1.sender_address,
};

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [selectedAccountKey, setSelectedAccountKey] = useState("patient1");
  const [health, setHealth] = useState(null);
  const [status, setStatus] = useState("Idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const [patientForm, setPatientForm] = useState(initialPatientForm);
  const [doctorForm, setDoctorForm] = useState(initialDoctorForm);
  const [grantForm, setGrantForm] = useState(initialGrantForm);
  const [addRecordForm, setAddRecordForm] = useState(initialAddRecordForm);
  const [lookupForm, setLookupForm] = useState(initialLookupForm);

  const selectedAccount = useMemo(
    () => ACCOUNTS[selectedAccountKey],
    [selectedAccountKey]
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    loadHealth();
  }, []);

  async function loadHealth() {
    try {
      const data = await healthCheck();
      setHealth(data);
    } catch (err) {
      setError(err.message);
    }
  }

  function withSelectedAccount(payload) {
    return {
      sender_address: selectedAccount.sender_address,
      private_key: selectedAccount.private_key,
      ...payload,
    };
  }

  async function runAction(actionLabel, actionFn) {
    try {
      setStatus(`Running: ${actionLabel}`);
      setError("");
      const data = await actionFn();
      setResult(data);
      setStatus(`Success: ${actionLabel}`);
      await loadHealth();
    } catch (err) {
      setError(err.message || "Something went wrong");
      setStatus(`Failed: ${actionLabel}`);
    }
  }

  return (
    <div className="app-shell">
      <Sidebar
        theme={theme}
        setTheme={setTheme}
        selectedAccountKey={selectedAccountKey}
        setSelectedAccountKey={setSelectedAccountKey}
        selectedAccount={selectedAccount}
        accounts={ACCOUNTS}
        health={health}
      />

      <main className="main-content">
        <TopHero health={health} />
        <StatusCards status={status} health={health} />

        {error && (
          <section className="alert error">
            <strong>Error:</strong> {error}
          </section>
        )}

        <section className="grid two-col">
          <RegisterPatientForm
            patientForm={patientForm}
            setPatientForm={setPatientForm}
            onSubmit={() =>
              runAction("Register Patient", () =>
                registerPatient(withSelectedAccount(patientForm))
              )
            }
          />

          <RegisterDoctorForm
            doctorForm={doctorForm}
            setDoctorForm={setDoctorForm}
            onSubmit={() =>
              runAction("Register Doctor", () =>
                registerDoctor(withSelectedAccount(doctorForm))
              )
            }
          />
        </section>

        <section className="grid two-col">
          <AccessControlPanel
            grantForm={grantForm}
            setGrantForm={setGrantForm}
            onGrant={() =>
              runAction("Grant Access", () =>
                grantAccess(withSelectedAccount(grantForm))
              )
            }
            onRevoke={() =>
              runAction("Revoke Access", () =>
                revokeAccess(withSelectedAccount(grantForm))
              )
            }
          />

          <AddRecordForm
            addRecordForm={addRecordForm}
            setAddRecordForm={setAddRecordForm}
            onSubmit={() =>
              runAction("Add Health Record", () =>
                addRecord(withSelectedAccount(addRecordForm))
              )
            }
          />
        </section>

        <LookupPanel
          lookupForm={lookupForm}
          setLookupForm={setLookupForm}
          onGetPatient={() =>
            runAction("Get Patient Profile", () =>
              getPatient(lookupForm.patientAddress)
            )
          }
          onGetDoctor={() =>
            runAction("Get Doctor Profile", () =>
              getDoctor(lookupForm.doctorAddress)
            )
          }
          onCheckAccess={() =>
            runAction("Check Access", () =>
              getAccess(lookupForm.patientAddress, lookupForm.doctorAddress)
            )
          }
          onGetCount={() =>
            runAction("Get Record Count", () =>
              getRecordCount(lookupForm.patientAddress)
            )
          }
          onViewRecord={() =>
            runAction("View Record", () =>
              getRecord(
                lookupForm.patientAddress,
                lookupForm.recordIndex,
                lookupForm.viewerAddress
              )
            )
          }
        />

        <div style={{ marginTop: "18px" }}>
          <ResultConsole result={result} />
        </div>
      </main>
    </div>
  );
}