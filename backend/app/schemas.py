from pydantic import BaseModel


class RegisterPatientRequest(BaseModel):
    name: str
    dob: str
    gender: str


class RegisterDoctorRequest(BaseModel):
    name: str
    specialty: str