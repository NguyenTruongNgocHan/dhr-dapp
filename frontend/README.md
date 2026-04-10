# dhr-dapp Frontend

## 1. Overview
This frontend is built with React and Vite for the dhr-dapp project.

It provides a user interface to interact with backend APIs, which then communicate with the blockchain.

## 2. Technologies used
- React
- Vite
- JavaScript

## 3. Installation
From the `frontend` folder, run:

```bash
npm install
```

## 4. Environment configuration
Create or update your environment file with the backend base URL.

Example:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

The frontend uses this value to call backend APIs.

## 5. Run application
From the `frontend` folder, run:

```bash
npm run dev
```

## 6. Access URL
After starting the app, open the Vite development URL shown in terminal.

Common default URL:
- `http://127.0.0.1:5173`

## 7. Features
- Register patient
- Register doctor
- Grant access to doctor
- Revoke access
- Add health records
- View data from blockchain
