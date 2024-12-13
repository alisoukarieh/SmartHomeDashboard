# Project Setup Guide

This guide will help you set up the project by creating a Python virtual environment, installing the required Python packages, running the FastAPI server, installing the Node.js packages, and running the Next.js server.

## Requirements

- Python 3.x
- Node.js (version 14.x or higher recommended)
- npm (comes with Node.js)
- pip (Python package installer)

## Backend Setup (FastAPI)

### 1. Prepare and run backend

Add the ip address of the esp on line 9 of server.py:

```sh
esp_ip = "XXX.XXX.X.XX"
```

Navigate to the `backend` directory:

```sh
cd backend
```

Create a virtual environment:

```sh
python -m venv venv
```

Activate the virtual environment:

- On Windows:
  ```sh
  venv\Scripts\activate
  ```
- On macOS/Linux:
  ```sh
  source venv/bin/activate
  ```

Install Python packages:

```sh
pip install -r requirements.txt
```

Run the server:

```sh
uvicorn main:app --reload
```

## Frontend Setup (Next.js)

### 2. Prepare and run frontend

Navigate to the `frontend` directory:

```sh
cd frontend
```

Create .env file and add the ip address of the backend server:

```sh
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Install npm packages:

```sh
npm install
```

Run the server:

```sh
npm run dev
```
