import os
import json
import time
from groq import Groq
from dotenv import load_dotenv
from services.cache import get_cached_response, set_cached_response

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

FALLBACK_RESPONSE = {
    "title": "Service Temporarily Unavailable",
    "description": "AI service is temporarily unavailable. Please try again later.",
    "key_points": ["Service unavailable"],
    "impact": "Unable to process request at this time",
    "recommendations": [],
    "is_fallback": True
}

def call_groq(prompt: str) -> dict:
    # Check cache first
    cached = get_cached_response(prompt)
    if cached:
        return cached

    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.3,
                max_tokens=1000
            )
            content = response.choices[0].message.content
            result = json.loads(content)
            
            # Save to cache
            set_cached_response(prompt, result)
            
            return result
        except Exception as e:
            print(f"Attempt {attempt + 1} failed: {e}")
            if attempt < max_retries - 1:
                time.sleep(2)
            else:
                return FALLBACK_RESPONSE
    return FALLBACK_RESPONSE