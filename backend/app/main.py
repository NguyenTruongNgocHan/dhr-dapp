from fastapi import FastAPI
from app.blockchain import w3, contract
from app.schemas import (
    RegisterPatientRequest,
    RegisterDoctorRequest,
    GrantAccessRequest,
    RevokeAccessRequest,
    AddHealthRecordRequest,
)
from app.contract_service import (
    register_patient,
    register_doctor,
    grant_access,
    revoke_access,
    add_health_record,
    get_patient_profile,
    get_doctor_profile,
    has_access,
    get_record_count,
    get_record,
)
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="DHR Backend API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "DHR backend is running"}


@app.get("/health")
def health():
    return {
        "connected": w3.is_connected(),
        "block_number": w3.eth.block_number,
        "contract_address": contract.address,
    }


@app.post("/patient/register")
def api_register_patient(payload: RegisterPatientRequest):
    return register_patient(
        payload.sender_address,
        payload.private_key,
        payload.name,
        payload.dob,
        payload.gender,
    )


@app.post("/doctor/register")
def api_register_doctor(payload: RegisterDoctorRequest):
    return register_doctor(
        payload.sender_address,
        payload.private_key,
        payload.name,
        payload.specialty,
    )


@app.post("/access/grant")
def api_grant_access(payload: GrantAccessRequest):
    return grant_access(payload.sender_address, payload.private_key, payload.doctor)


@app.post("/access/revoke")
def api_revoke_access(payload: RevokeAccessRequest):
    return revoke_access(payload.sender_address, payload.private_key, payload.doctor)


@app.post("/record/add")
def api_add_record(payload: AddHealthRecordRequest):
    return add_health_record(
        payload.sender_address,
        payload.private_key,
        payload.patient,
        payload.diagnosis,
        payload.prescription,
        payload.note,
    )


@app.get("/patient/{address}")
def api_get_patient(address: str):
    return get_patient_profile(address)


@app.get("/doctor/{address}")
def api_get_doctor(address: str):
    return get_doctor_profile(address)


@app.get("/access/{patient}/{doctor}")
def api_has_access(patient: str, doctor: str):
    return has_access(patient, doctor)


@app.get("/records/count/{patient}")
def api_record_count(patient: str):
    return get_record_count(patient)


@app.get("/record/{patient}/{index}/{viewer}")
def api_get_record(patient: str, index: int, viewer: str):
    return get_record(patient, index, viewer)