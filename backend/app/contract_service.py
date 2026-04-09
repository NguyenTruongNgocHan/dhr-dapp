from web3 import Web3
from app.blockchain import w3, contract
from app.config import DEFAULT_SENDER_ADDRESS, DEFAULT_PRIVATE_KEY, CHAIN_ID


def _build_and_send_tx(tx):
    signed_tx = w3.eth.account.sign_transaction(tx, private_key=DEFAULT_PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    return {
        "tx_hash": tx_hash.hex(),
        "block_number": receipt.blockNumber,
        "status": receipt.status,
        "gas_used": receipt.gasUsed,
    }


def register_patient(name: str, dob: str, gender: str):
    sender = Web3.to_checksum_address(DEFAULT_SENDER_ADDRESS)
    nonce = w3.eth.get_transaction_count(sender)

    tx = contract.functions.registerPatient(name, dob, gender).build_transaction({
        "from": sender,
        "nonce": nonce,
        "chainId": CHAIN_ID,
        "gas": 500000,
        "gasPrice": w3.to_wei("2", "gwei"),
    })

    return _build_and_send_tx(tx)


def register_doctor(name: str, specialty: str):
    sender = Web3.to_checksum_address(DEFAULT_SENDER_ADDRESS)
    nonce = w3.eth.get_transaction_count(sender)

    tx = contract.functions.registerDoctor(name, specialty).build_transaction({
        "from": sender,
        "nonce": nonce,
        "chainId": CHAIN_ID,
        "gas": 500000,
        "gasPrice": w3.to_wei("2", "gwei"),
    })

    return _build_and_send_tx(tx)