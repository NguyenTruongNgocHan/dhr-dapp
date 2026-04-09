from web3 import Web3
from app.blockchain import w3, contract
from app.config import CHAIN_ID


def _build_and_send_tx(tx, private_key: str):
    signed_tx = w3.eth.account.sign_transaction(tx, private_key=private_key)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    return {
        "tx_hash": tx_hash.hex(),
        "block_number": receipt.blockNumber,
        "status": receipt.status,
        "gas_used": receipt.gasUsed,
    }


def register_patient(sender_address: str, private_key: str, name: str, dob: str, gender: str):
    sender = Web3.to_checksum_address(sender_address)
    nonce = w3.eth.get_transaction_count(sender)

    tx = contract.functions.registerPatient(name, dob, gender).build_transaction({
        "from": sender,
        "nonce": nonce,
        "chainId": CHAIN_ID,
        "gas": 500000,
        "gasPrice": w3.to_wei("2", "gwei"),
    })

    return _build_and_send_tx(tx, private_key)


def register_doctor(sender_address: str, private_key: str, name: str, specialty: str):
    sender = Web3.to_checksum_address(sender_address)
    nonce = w3.eth.get_transaction_count(sender)

    tx = contract.functions.registerDoctor(name, specialty).build_transaction({
        "from": sender,
        "nonce": nonce,
        "chainId": CHAIN_ID,
        "gas": 500000,
        "gasPrice": w3.to_wei("2", "gwei"),
    })

    return _build_and_send_tx(tx, private_key)


def grant_access(sender_address: str, private_key: str, doctor: str):
    sender = Web3.to_checksum_address(sender_address)
    doctor_addr = Web3.to_checksum_address(doctor)
    nonce = w3.eth.get_transaction_count(sender)

    tx = contract.functions.grantAccess(doctor_addr).build_transaction({
        "from": sender,
        "nonce": nonce,
        "chainId": CHAIN_ID,
        "gas": 500000,
        "gasPrice": w3.to_wei("2", "gwei"),
    })

    return _build_and_send_tx(tx, private_key)


def revoke_access(sender_address: str, private_key: str, doctor: str):
    sender = Web3.to_checksum_address(sender_address)
    doctor_addr = Web3.to_checksum_address(doctor)
    nonce = w3.eth.get_transaction_count(sender)

    tx = contract.functions.revokeAccess(doctor_addr).build_transaction({
        "from": sender,
        "nonce": nonce,
        "chainId": CHAIN_ID,
        "gas": 500000,
        "gasPrice": w3.to_wei("2", "gwei"),
    })

    return _build_and_send_tx(tx, private_key)


def add_health_record(
    sender_address: str,
    private_key: str,
    patient: str,
    diagnosis: str,
    prescription: str,
    note: str,
):
    sender = Web3.to_checksum_address(sender_address)
    patient_addr = Web3.to_checksum_address(patient)
    nonce = w3.eth.get_transaction_count(sender)

    tx = contract.functions.addHealthRecord(
        patient_addr, diagnosis, prescription, note
    ).build_transaction({
        "from": sender,
        "nonce": nonce,
        "chainId": CHAIN_ID,
        "gas": 700000,
        "gasPrice": w3.to_wei("2", "gwei"),
    })

    return _build_and_send_tx(tx, private_key)


def get_patient_profile(patient: str):
    patient_addr = Web3.to_checksum_address(patient)
    result = contract.functions.getPatientProfile(patient_addr).call()
    return {
        "exists": result[0],
        "name": result[1],
        "dob": result[2],
        "gender": result[3],
        "record_count": result[4],
    }


def get_doctor_profile(doctor: str):
    doctor_addr = Web3.to_checksum_address(doctor)
    result = contract.functions.getDoctorProfile(doctor_addr).call()
    return {
        "exists": result[0],
        "name": result[1],
        "specialty": result[2],
    }


def has_access(patient: str, doctor: str):
    patient_addr = Web3.to_checksum_address(patient)
    doctor_addr = Web3.to_checksum_address(doctor)
    return {"has_access": contract.functions.hasAccess(patient_addr, doctor_addr).call()}


def get_record_count(patient: str):
    patient_addr = Web3.to_checksum_address(patient)
    return {"count": contract.functions.getHealthRecordCount(patient_addr).call()}


def get_record(patient: str, index: int, viewer_address: str):
    patient_addr = Web3.to_checksum_address(patient)
    viewer = Web3.to_checksum_address(viewer_address)

    result = contract.functions.viewHealthRecord(patient_addr, index).call({"from": viewer})
    return {
        "diagnosis": result[0],
        "prescription": result[1],
        "note": result[2],
        "created_at": result[3],
        "created_by": result[4],
    }