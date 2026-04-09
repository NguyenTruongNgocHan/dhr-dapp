from pydantic import BaseModel


class SenderPayload(BaseModel):
    sender_address: str
    private_key: str


class RegisterPatientRequest(SenderPayload):
    name: str
    dob: str
    gender: str


class RegisterDoctorRequest(SenderPayload):
    name: str
    specialty: str


class GrantAccessRequest(SenderPayload):
    doctor: str


class RevokeAccessRequest(SenderPayload):
    doctor: str


class AddHealthRecordRequest(SenderPayload):
    patient: str
    diagnosis: str
    prescription: str
    note: str