# dhr-dapp Backend

## 1. Overview
This backend is built with FastAPI and Web3.py for the dhr-dapp project.

It connects the frontend to the blockchain smart contract and returns JSON responses for client applications.

## 2. Role of backend
The backend works as a bridge between frontend and blockchain by:
- receiving requests from frontend
- building and signing transactions
- sending transactions to blockchain
- reading data from smart contract
- returning JSON responses

## 3. Project structure (main files)
- `app/main.py`: FastAPI app entry point and API routing setup.
- `app/blockchain.py`: Web3 connection, transaction handling, and blockchain utilities.
- `app/contract_service.py`: Smart contract interaction logic.
- `app/schemas.py`: Request/response data schemas.
- `app/config.py`: Configuration loading for RPC and contract settings.
- `app/abi/DHR.json`: Contract ABI used to create the contract instance.

## 4. Installation
From the `backend` folder:

```bash
python -m venv .venv
pip install -r requirements.txt
```

## 5. Configuration (RPC_URL, CONTRACT_ADDRESS, CHAIN_ID)
Set your environment variables before running the server.

Example:

```env
RPC_URL=http://127.0.0.1:8545
CONTRACT_ADDRESS=0x...
CHAIN_ID=1337
```

## 6. ABI setup
Copy the smart contract ABI file to:

- `backend/app/abi/DHR.json`

Make sure the ABI matches the latest deployed contract version.

## 7. Run server
From the `backend` folder, run:

```bash
uvicorn app.main:app --reload
```

The backend will start locally (default FastAPI address is usually `http://127.0.0.1:8000`).

## 8. Quick testing
You can quickly test the backend by opening:
- `/docs` for interactive API documentation
- `/health` for basic service status check

## 9. Main API functionalities (high-level only)
The backend APIs support high-level operations such as:
- patient and doctor registration flow
- permission management (grant/revoke access)
- adding health records through contract transactions
- reading health records and permission state from smart contract
