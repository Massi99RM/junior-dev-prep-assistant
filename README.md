# Junior Dev Prep Assistant

![Python](https://img.shields.io/badge/Python-3.12-blue.svg)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)

An interactive interview prep tool for junior developers, built to review core concepts across software engineering and AI/ML through a conversational AI interface. Runs locally with a single `docker compose up`.

## Overview

This project provides a focused coaching environment for entry-level candidates preparing for technical interviews. Topics are organized by category, starting with software engineering fundamentals, with AI/ML coverage.

The LLM layer supports both Anthropic's Claude API and a local Ollama instance, so the tool works whether or not you can affor to pay for a key.

## Core Concepts

**Topic Modules:** Prompts are organized by category (Software Engineering, AI/ML) in JSON files and can be extended without touching existing code.

**Backend:** Asynchronous request handling via FastAPI, with a unified LLM service layer that routes to either Claude or Ollama. All settings come from environment variables.

**Frontend:** A React interface (Vite) with curated, clickable prompts covering high-frequency interview topics: REST design, Git workflows, SQL, data structures, system design, and more. Replies are rendered as markdown, including tables and code blocks.

**Containers:** The backend runs on a Python image as a non-root user. The frontend is built in a multi-stage Dockerfile and served as static files by nginx.

## How It Works

The React frontend sends a prompt to the FastAPI backend, which routes it to the active LLM provider. The response is returned and displayed in the UI. Switching between Claude and Ollama requires only a config change, no code modifications.

```
Browser ──► nginx (frontend, :8080) serves the static React build
   │
   └──────► FastAPI (backend, :8000) ──► Ollama (on the host, :11434)
                                     └─► Claude API (internet)
```

The browser calls the backend directly, so the backend port is published to the host and the API URL is a build-time setting of the frontend.

## Configuration

Copy `.env.example` to `.env` and edit it. `.env` is git-ignored and never copied into an image.

| Variable | Default | Description |
|----------|---------|-------------|
| `LLM_PROVIDER` | `ollama` | Active provider: `ollama` or `claude` |
| `OLLAMA_BASE_URL` | `http://host.docker.internal:11434` | Where the backend reaches Ollama |
| `OLLAMA_MODEL` | `llama3.2` | Model used with Ollama |
| `CORS_ORIGINS` | `http://localhost:8080` | Comma-separated list of allowed frontend origins |
| `ANTHROPIC_API_KEY` | empty | Required only when `LLM_PROVIDER=claude` |

## Usage

### Running with Docker (recommended)

Prerequisites:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine with Compose)
- [Ollama](https://ollama.com) installed and running, with the model pulled: `ollama pull llama3.2`
- Or an Anthropic API key, if you prefer Claude

Steps:
```bash
cp .env.example .env        # Windows PowerShell: Copy-Item .env.example .env
docker compose up --build
```

Then open [http://localhost:8080](http://localhost:8080). API docs are at [http://localhost:8000/docs](http://localhost:8000/docs).

To use Claude, set your key and `LLM_PROVIDER=claude` in `.env`, then run `docker compose down` followed by `docker compose up`. No rebuild is needed, because `.env` is read at runtime.

Rebuild with `--build` after changing code, a Dockerfile, or the frontend API URL (`VITE_API_URL` in `docker-compose.yml`, baked in at build time).

**Linux note:** Ollama listens only on `127.0.0.1` by default, which containers cannot reach. Start it with `OLLAMA_HOST=0.0.0.0` (for the systemd service, set it in the unit override) so the backend can connect through `host.docker.internal`. The compose file already maps that name to the host gateway.

### Running without Docker (development)

Backend, from the project root (Python 3.12):
```bash
python -m venv venv
venv\Scripts\activate       # macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn backend.main:app --reload
```

Frontend, in a second terminal:
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). In your `.env`, set:
```
OLLAMA_BASE_URL=http://localhost:11434
CORS_ORIGINS=http://localhost:5173
```
`.env` is not watched by `--reload`, so restart uvicorn after editing it.

## Project Structure

```
junior-dev-prep-assistant/
│
├── .env.example            # Template for environment variables
├── .gitignore              # Git exclusion rules for node_modules, venv, cache, etc.
├── .dockerignore           # Keeps .env, venv, node_modules out of the backend image
├── requirements.txt        # Python direct dependencies (pinned)
├── docker-compose.yml      # Runs backend and frontend together
│
├── backend/                # FastAPI application, routers, and LLM service layer
│   ├── Dockerfile          # Python 3.12 slim image, runs as non-root user
│   ├── __init__.py
│   ├── main.py             # FastAPI entrypoint, CORS setup, and router inclusion
│   ├── config.py           # Environment configuration and provider settings (.env support)
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── topics.py       # GET /api/topics — serves topic hierarchy from swe.json
│   │   ├── chat.py         # POST /api/chat — handles messages and routes to LLM service
│   │   └── config.py       # GET and POST /api/config — view and update active provider
│   ├── services/
│   │   ├── __init__.py
│   │   ├── llm_service.py      # Unified async adapter routing requests to Claude or Ollama
│   │   └── topic_service.py    # Loads, parses, and serves prompt modules from the data directory
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── schemas.py      # Pydantic models for strict request/response data validation
│   └── data/
│       └── swe.json        # Modular JSON file storing Software Engineering categories and prompts
│
└── frontend/               # React application (Vite)
    ├── Dockerfile          # Multi-stage build: Node builds, nginx serves dist/
    ├── .dockerignore
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar.jsx         # Topic categories and clickable prompt buttons
    │   │   ├── ChatPanel.jsx       # Message history, input, loading state, markdown rendering
    │   │   └── ProviderBadge.jsx   # Displays active LLM provider in the header
    │   ├── services/
    │   │   └── api.js              # Centralised axios client, base URL from VITE_API_URL
    │   ├── App.jsx                 # Root component — shared state and layout
    │   ├── App.css                 # Layout and component styles
    │   ├── index.css               # Global CSS variables, resets, light/dark theme
    │   └── main.jsx                # React entry point
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## License

MIT