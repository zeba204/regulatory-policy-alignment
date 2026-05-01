# AI Service — Regulatory Policy Alignment

## Overview
AI microservice built with Flask and Groq LLaMA-3.3-70b for regulatory policy analysis.

## Tech Stack
- Python 3.11
- Flask 3.x
- Groq API (LLaMA-3.3-70b)
- Redis 7 (AI response cache)

## Prerequisites
- Python 3.11
- Redis 7
- Groq API key (free at console.groq.com)

## Setup

### 1. Clone the repo
git clone https://github.com/tecsxpert/regulatory-policy-alignment

### 2. Go to ai-service folder
cd ai-service

### 3. Install dependencies
pip install -r requirements.txt

### 4. Create .env file
GROQ_API_KEY=your_groq_api_key_here
REDIS_HOST=localhost
REDIS_PORT=6379

### 5. Run the service
python app.py

### 6. Health check
curl http://localhost:5000/health

## API Reference

### GET /health
Returns service health status.

Response:
{
  "status": "healthy",
  "model": "llama-3.3-70b-versatile",
  "uptime_seconds": 10.5,
  "avg_response_time_seconds": 0.5,
  "total_requests": 5,
  "timestamp": "2026-04-23T09:00:00"
}

### POST /describe
Analyzes a regulatory policy and returns description.

Request:
{
  "policy_name": "GDPR",
  "policy_content": "Organizations must protect personal data"
}

Response:
{
  "title": "GDPR Policy",
  "description": "Policy description",
  "key_points": ["point 1", "point 2", "point 3"],
  "impact": "Policy impact",
  "generated_at": "2026-04-23T09:00:00"
}

### POST /recommend
Returns 3 recommendations for a policy.

Request:
{
  "policy_name": "GDPR",
  "policy_content": "Organizations must protect personal data"
}

Response:
{
  "recommendations": [
    {
      "action_type": "Action type",
      "description": "Description",
      "priority": "HIGH/MEDIUM/LOW"
    }
  ],
  "generated_at": "2026-04-23T09:00:00"
}

### POST /generate-report
Generates a full report for a policy.

Request:
{
  "policy_name": "GDPR",
  "policy_content": "Organizations must protect personal data"
}

Response:
{
  "title": "Report title",
  "summary": "Executive summary",
  "overview": "Detailed overview",
  "key_items": ["item 1", "item 2", "item 3"],
  "recommendations": [...],
  "generated_at": "2026-04-23T09:00:00"
}