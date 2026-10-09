# Junior Dev Prep Assistant

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)

An interactive interview prep tool for junior developers, built to review 
core concepts across software engineering and AI/ML through a conversational 
AI interface.

## Overview

This project provides a focused coaching environment for entry-level 
candidates preparing for technical interviews. Topics are organized by 
category — starting with software engineering fundamentals, with AI/ML 
coverage added as a second module. Each category ships independently, 
so the tool grows without requiring rewrites.

The LLM layer supports both Anthropic's Claude API and a local Ollama 
instance, so the tool works whether or not you have API budget.

## Core Concepts

**Topic Modules:** Prompts are organized by category (Software Engineer, AI/ML) and 
can be extended without touching existing code.

**Backend:** Asynchronous request handling via FastAPI, with a unified 
LLM service layer that routes to either Claude or Ollama.

**Frontend:** A React interface with curated, clickable prompts covering 
high-frequency interview topics: REST design, Git workflows, SQL, 
data structures, system design, and more.

## How It Works

The React frontend sends a prompt to the FastAPI backend, which formats 
the request and routes it to the active LLM provider. The response is 
returned and displayed in the UI. Switching between Claude and Ollama 
requires only a config change — no code modifications.

## Project Structure

```
junior-dev-prep-assistant/
│
├── .env.example        # Template for environment variables
├── .gitignore          # Git exclusion rules for node_modules, venv, cache, etc.
├── requirements.txt    # Python direct dependencies
│
├── backend/            # FastAPI application, routers, and LLM service layer
│       ├── __init__.py
│       ├── main.py     # FastAPI entrypoint, CORS setup, and router inclusion
│       ├── config.py   # Environment configuration and provider settings (.env support)
│       ├── routers/
│       │   ├── __init__.py
│       │   ├── topics.py   # GET /api/topics — serves topic hierarchy from swe.json
│       │   ├── chat.py     # POST /api/chat — handles messages and routes to LLM service
│       │   └── config.py   # GET and POST /api/config — view and update active provider
│       ├── services/
│       │   ├── __init__.py
│       │   ├── llm_service.py      # Unified async adapter routing requests to Claude or Ollama
│       │   └── topic_service.py    # Loads, parses, and serves prompt modules from the data directory
│       ├── schemas/
│       │   ├── __init__.py
│       │   └── schemas.py  # Pydantic models for strict request/response data validation
│       └── data/
│           └── swe.json    # Modular JSON file storing Software Engineering categories and prompts
│
├── frontend/                   # React application (Vite)
│       ├── public/
│       ├── src/
│       │   ├── components/
│       │   │   ├── Sidebar.jsx         # Topic categories and clickable prompt buttons
│       │   │   ├── ChatPanel.jsx       # Message history, input, loading state, markdown rendering
│       │   │   └── ProviderBadge.jsx   # Displays active LLM provider in the header
│       │   ├── services/
│       │   │   └── api.js              # Centralised axios client for all backend API calls
│       │   ├── App.jsx                 # Root component — shared state and layout
│       │   ├── App.css                 # Layout and component styles
│       │   ├── index.css               # Global CSS variables, resets, light/dark theme
│       │   └── main.jsx                # React entry point
│       ├── index.html
│       ├── package.json
│       └── vite.config.js
│
├── docker-compose.yml  # Container orchestration for seamless local setup (pending)
└── README.md
```

## License

MIT