import json
from pathlib import Path
from web3 import Web3
from app.config import RPC_URL, CONTRACT_ADDRESS

w3 = Web3(Web3.HTTPProvider(RPC_URL))

ABI_PATH = Path(__file__).parent / "abi" / "DHR.json"

with open(ABI_PATH, "r", encoding="utf-8") as f:
    contract_abi = json.load(f)

contract = w3.eth.contract(
    address=Web3.to_checksum_address(CONTRACT_ADDRESS),
    abi=contract_abi
)