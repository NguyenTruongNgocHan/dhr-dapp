from fastapi import FastAPI
from app.blockchain import w3, contract
from app.schemas import RegisterPatientRequest, RegisterDoctorRequest
from app.contract_service import register_patient, register_doctor

app = FastAPI(title="DHR Backend API")


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
    return register_patient(payload.name, payload.dob, payload.gender)


@app.post("/doctor/register")
def api_register_doctor(payload: RegisterDoctorRequest):
    return register_doctor(payload.name, payload.specialty)