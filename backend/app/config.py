import os
from dotenv import load_dotenv

load_dotenv()

RPC_URL = os.getenv("RPC_URL", "http://127.0.0.1:8545")
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS", "")
CHAIN_ID = int(os.getenv("CHAIN_ID", "1337"))
DEFAULT_SENDER_ADDRESS = os.getenv("DEFAULT_SENDER_ADDRESS", "")
DEFAULT_PRIVATE_KEY = os.getenv("DEFAULT_PRIVATE_KEY", "")