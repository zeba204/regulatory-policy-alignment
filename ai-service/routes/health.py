from flask import Blueprint, jsonify
from datetime import datetime
import time

health_bp = Blueprint('health', __name__)

start_time = time.time()
response_times = []

def track_response_time(response_time: float):
    response_times.append(response_time)
    # Keep only last 100 response times
    if len(response_times) > 100:
        response_times.pop(0)

def get_avg_response_time():
    if not response_times:
        return 0
    return round(sum(response_times) / len(response_times), 3)

@health_bp.route('/health', methods=['GET'])
def health():
    start = time.time()
    uptime = time.time() - start_time
    
    response = {
        "status": "healthy",
        "model": "llama-3.3-70b-versatile",
        "uptime_seconds": round(uptime, 2),
        "avg_response_time_seconds": get_avg_response_time(),
        "total_requests": len(response_times),
        "timestamp": datetime.utcnow().isoformat()
    }
    
    # Track response time
    track_response_time(time.time() - start)
    
    return jsonify(response), 200