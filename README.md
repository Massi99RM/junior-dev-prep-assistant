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
├── backend/            # FastAPI application, routers, and LLM service layer
├── frontend/           # React application featuring the suggested prompts interface
├── docker-compose.yml  # Container orchestration for seamless local setup
└── README.md
```

## License

MIT