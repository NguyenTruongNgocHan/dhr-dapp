# @version ^0.4.3

struct PatientRecord:
    exists: bool
    name: String[100]
    dob: String[20]
    gender: String[20]
    record_count: uint256

struct DoctorInfo:
    exists: bool
    name: String[100]
    specialty: String[100]

struct AccessPermission:
    can_access: bool
    granted_at: uint256

struct HealthRecord:
    diagnosis: String[256]
    prescription: String[256]
    note: String[256]
    created_at: uint256
    created_by: address

event PatientRegistered:
    patient: indexed(address)
    name: String[100]
    timestamp: uint256

event DoctorRegistered:
    doctor: indexed(address)
    name: String[100]
    specialty: String[100]
    timestamp: uint256

event AccessGranted:
    patient: indexed(address)
    doctor: indexed(address)
    timestamp: uint256

event AccessRevoked:
    patient: indexed(address)
    doctor: indexed(address)
    timestamp: uint256

event HealthRecordAdded:
    patient: indexed(address)
    doctor: indexed(address)
    record_index: uint256
    timestamp: uint256

event HealthRecordViewed:
    patient: indexed(address)
    viewer: indexed(address)
    record_index: uint256
    timestamp: uint256

patients: public(HashMap[address, PatientRecord])
doctors: public(HashMap[address, DoctorInfo])
permissions: public(HashMap[address, HashMap[address, AccessPermission]])
health_records: HashMap[address, HashMap[uint256, HealthRecord]]

@internal
@view
def _is_patient(user: address) -> bool:
    return self.patients[user].exists

@internal
@view
def _is_doctor(user: address) -> bool:
    return self.doctors[user].exists

@internal
@view
def _can_view(patient: address, viewer: address) -> bool:
    if viewer == patient:
        return True
    if self.permissions[patient][viewer].can_access:
        return True
    return False

@internal
@view
def _can_add_record(patient: address, doctor: address) -> bool:
    if doctor == patient:
        return True
    if self.permissions[patient][doctor].can_access:
        return True
    return False

@external
def registerPatient(name: String[100], dob: String[20], gender: String[20]):
    assert not self.patients[msg.sender].exists, "Patient already registered"
    assert not self.doctors[msg.sender].exists, "Address already registered as doctor"

    self.patients[msg.sender] = PatientRecord({
        exists: True,
        name: name,
        dob: dob,
        gender: gender,
        record_count: 0
    })

    log PatientRegistered(msg.sender, name, block.timestamp)

@external
def registerDoctor(name: String[100], specialty: String[100]):
    assert not self.doctors[msg.sender].exists, "Doctor already registered"
    assert not self.patients[msg.sender].exists, "Address already registered as patient"

    self.doctors[msg.sender] = DoctorInfo({
        exists: True,
        name: name,
        specialty: specialty
    })

    log DoctorRegistered(msg.sender, name, specialty, block.timestamp)

@external
def grantAccess(doctor: address):
    assert self.patients[msg.sender].exists, "Only patient can grant"
    assert self.doctors[doctor].exists, "Doctor not registered"
    assert doctor != empty(address), "Invalid doctor address"

    self.permissions[msg.sender][doctor] = AccessPermission({
        can_access: True,
        granted_at: block.timestamp
    })

    log AccessGranted(msg.sender, doctor, block.timestamp)

@external
def revokeAccess(doctor: address):
    assert self.patients[msg.sender].exists, "Only patient can revoke"
    assert self.doctors[doctor].exists, "Doctor not registered"

    self.permissions[msg.sender][doctor] = AccessPermission({
        can_access: False,
        granted_at: 0
    })

    log AccessRevoked(msg.sender, doctor, block.timestamp)

@external
def addHealthRecord(
    patient: address,
    diagnosis: String[256],
    prescription: String[256],
    note: String[256]
):
    assert self.patients[patient].exists, "Patient not registered"
    assert self._can_add_record(patient, msg.sender), "No permission to add"

    idx: uint256 = self.patients[patient].record_count

    self.health_records[patient][idx] = HealthRecord({
        diagnosis: diagnosis,
        prescription: prescription,
        note: note,
        created_at: block.timestamp,
        created_by: msg.sender
    })

    self.patients[patient].record_count += 1

    log HealthRecordAdded(patient, msg.sender, idx, block.timestamp)

@external
def viewHealthRecord(patient: address, index: uint256) -> HealthRecord:
    assert self.patients[patient].exists, "Patient not registered"
    assert index < self.patients[patient].record_count, "Invalid record index"
    assert self._can_view(patient, msg.sender), "No permission to view"

    log HealthRecordViewed(patient, msg.sender, index, block.timestamp)
    return self.health_records[patient][index]

@external
@view
def getHealthRecordCount(patient: address) -> uint256:
    assert self.patients[patient].exists, "Patient not registered"
    return self.patients[patient].record_count

@external
@view
def hasAccess(patient: address, doctor: address) -> bool:
    return self.permissions[patient][doctor].can_access

@external
@view
def getPatientProfile(patient: address) -> PatientRecord:
    assert self.patients[patient].exists, "Patient not registered"
    return self.patients[patient]

@external
@view
def getDoctorProfile(doctor: address) -> DoctorInfo:
    assert self.doctors[doctor].exists, "Doctor not registered"
    return self.doctors[doctor]