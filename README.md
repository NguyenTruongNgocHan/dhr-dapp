# dhr-dapp

## 1. Project Title
**dhr-dapp - Digital Health Records DApp**

## 2. Introduction
This project is a student-built Decentralized Application (DApp) for managing electronic health records on blockchain.

The system focuses on secure and transparent sharing of medical data between patients and doctors. Instead of storing access control logic in a centralized server, permissions are enforced through a smart contract.

## 3. Objectives
- Build a blockchain-based health record management system.
- Allow patients and doctors to register on-chain.
- Let patients control which doctors can access their records.
- Support adding and viewing health records with permission checks.
- Connect a full-stack architecture: Smart Contract, Backend API, and Frontend UI.

## 4. System Architecture
The project has 3 layers:

1. **Smart Contract Layer (Vyper)**
	- Defines core logic for identities, permissions, and health records.
2. **Backend Layer (FastAPI + Web3.py)**
	- Exposes REST APIs and interacts with the deployed contract.
3. **Frontend Layer (React + Vite)**
	- Provides a user interface for patients/doctors and calls backend APIs.

Flow:

```text
React (Frontend) -> FastAPI (Backend) -> Web3.py -> Vyper Smart Contract -> Local Geth Blockchain
```

## 5. Project Structure (high-level)
```text
dhr-dapp/
|- contract/   # Vyper contract, Ape config, deployment script
|- backend/    # FastAPI app, contract service, ABI integration
|- frontend/   # React + Vite user interface
|- README.md
```

## 6. Technologies Used
- **Blockchain Node:** Geth (local network)
- **Smart Contract:** Vyper
- **Contract Tooling:** Ape Framework
- **Backend:** FastAPI, Web3.py
- **Frontend:** React, Vite
- **Language/Runtime:** Python, JavaScript

## 7. How to Run the Project (step-by-step)
### Step 1: Start local Geth blockchain
Start your local Geth node (HTTP RPC should be available at `http://127.0.0.1:8545`).

### Step 2: Compile and deploy smart contract
Go to the `contract` folder and run:

```bash
ape compile
ape run deploy --network ethereum:local:http://127.0.0.1:8545
```

After deployment, copy the deployed **contract address**.

### Step 3: Update backend contract configuration
Update the backend with:
- `CONTRACT_ADDRESS` (new deployed address)
- Contract `ABI` (matching the deployed contract)

This step is required so the backend can call the correct on-chain contract.

### Step 4: Run backend server
Go to the `backend` folder and install dependencies, then start FastAPI:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs by default at `http://127.0.0.1:8000`.

### Step 5: Run frontend app
Go to the `frontend` folder and run:

```bash
npm install
npm run dev
```

Open the local Vite URL shown in terminal (usually `http://127.0.0.1:5173`).

## 8. Features
- Register patient
- Register doctor
- Grant access to doctor
- Revoke access
- Add health record
- View health records
- Check access permission

## 9. Expected Results
- Patients and doctors can be registered successfully.
- Patients can grant/revoke doctor access on-chain.
- Only authorized doctors can view or add records for a patient.
- The frontend can call backend APIs and display results clearly.
- The full workflow works end-to-end on a local blockchain.

## 10. Repository Link
`https://github.com/your-username/dhr-dapp`