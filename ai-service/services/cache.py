import redis
import json
import hashlib
import os

redis_client = redis.Redis(
    host=os.getenv('REDIS_HOST', 'localhost'),
    port=int(os.getenv('REDIS_PORT', 6379)),
    decode_responses=True
)

def get_cache_key(prompt: str) -> str:
    return hashlib.sha256(prompt.encode()).hexdigest()

def get_cached_response(prompt: str):
    try:
        key = get_cache_key(prompt)
        cached = redis_client.get(key)
        if cached:
            print(f"Cache hit for key: {key[:10]}...")
            return json.loads(cached)
        return None
    except Exception as e:
        print(f"Cache get error: {e}")
        return None

def set_cached_response(prompt: str, response: dict):
    try:
        key = get_cache_key(prompt)
        redis_client.setex(
            key,
            900,  # 15 min TTL
            json.dumps(response)
        )
        print(f"Cache set for key: {key[:10]}...")
    except Exception as e:
        print(f"Cache set error: {e}")