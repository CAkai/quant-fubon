

# quant-fubon

Python and TypeScript version of interaction with Fubon TradeAPI

## Fubon Neo API version v2.2.8

## Pre-Required

- Python >= 3.13
- [uv](https://docs.astral.sh/uv/) (recommended) or pip
- nvm (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows)
- Node.js v22

## Project Structure

```
quant-fubon/
├── lib/
│   ├── fubon-neo-js/           # Fubon JS/TS SDK (local package)
│   └── fubon-neo-py/           # Fubon Python SDK (.whl files)
├── js_fubon_neo/               # JS/TS application code
│   ├── check_account_balance.mjs  # Check inventory and bank balance
│   ├── example.mjs             # Login example (plain JS)
│   ├── index.js                # JS entry point
│   └── index.ts                # TypeScript entry point
├── python_fubon_neo/           # Python application code
│   ├── run1_check_accounts.py
│   ├── run2_check_accounts_inventory.py
│   └── run3_submit_buy_order.py
├── .env                        # Credentials (not committed)
└── .env.example                # Credential template
```

## Setup

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

```ini
USER_ID = your_user_id
USER_PASSWORD = your_account_password
USER_API_KEY = your_api_key
CERT_PATH = your_cert_path(憑證路徑)
CERT_PASSWORD = your_cert_password
```

---

## Python

### Install — uv (recommended)

```powershell
# Install uv if not already installed
pip install uv

# Sync environment from uv.lock (fastest, reproducible)
uv sync

# Or install directly from requirements.txt
uv pip install -r requirements.txt

# Install Fubon Neo Python SDK from local .whl
uv pip install --force-reinstall --no-cache .\lib\fubon-neo-py\fubon_neo-2.2.8-cp37-abi3-win_amd64.whl
```

### Install — pip (traditional)

```powershell
python -m venv .venv

# Windows
.\.venv\Scripts\Activate.ps1
# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
pip install --force-reinstall --no-cache lib\fubon-neo-py\fubon_neo-2.2.8-cp37-abi3-win_amd64.whl
```

### Run

```powershell
# uv
uv run python python_fubon_neo/run1_check_accounts.py
uv run python python_fubon_neo/run2_check_accounts_inventory.py
uv run python python_fubon_neo/run3_submit_buy_order.py

# pip (after activating .venv)
python python_fubon_neo/run1_check_accounts.py
python python_fubon_neo/run2_check_accounts_inventory.py
python python_fubon_neo/run3_submit_buy_order.py
```

---

## Node.js (JS/TypeScript)

### Install

```powershell
nvm use 22
npm install
```

### Run

```powershell
# Login and print accounts
npm run dev
# or directly:
node js_fubon_neo/index.js

# Login example (plain JS)
npm run example
# or directly:
node js_fubon_neo/example.mjs

# Check inventory and bank balance
npm run balance
# or directly:
node js_fubon_neo/check_account_balance.mjs

# TypeScript via tsx
npx tsx js_fubon_neo/index.ts
```
