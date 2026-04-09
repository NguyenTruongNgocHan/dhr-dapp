const API_BASE = "http://127.0.0.1:8000";

async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.detail || data?.error || "Request failed");
  }
  return data;
}

export async function healthCheck() {
  const res = await fetch(`${API_BASE}/health`);
  return handleResponse(res);
}

export async function registerPatient(payload) {
  const res = await fetch(`${API_BASE}/patient/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function registerDoctor(payload) {
  const res = await fetch(`${API_BASE}/doctor/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function grantAccess(payload) {
  const res = await fetch(`${API_BASE}/access/grant`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function revokeAccess(payload) {
  const res = await fetch(`${API_BASE}/access/revoke`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function addRecord(payload) {
  const res = await fetch(`${API_BASE}/record/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function getPatient(address) {
  const res = await fetch(`${API_BASE}/patient/${address}`);
  return handleResponse(res);
}

export async function getDoctor(address) {
  const res = await fetch(`${API_BASE}/doctor/${address}`);
  return handleResponse(res);
}

export async function getAccess(patient, doctor) {
  const res = await fetch(`${API_BASE}/access/${patient}/${doctor}`);
  return handleResponse(res);
}

export async function getRecordCount(patient) {
  const res = await fetch(`${API_BASE}/records/count/${patient}`);
  return handleResponse(res);
}

export async function getRecord(patient, index, viewer) {
  const res = await fetch(`${API_BASE}/record/${patient}/${index}/${viewer}`);
  return handleResponse(res);
}