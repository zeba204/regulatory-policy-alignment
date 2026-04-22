from flask import Blueprint, jsonify
from datetime import datetime
import time

health_bp = Blueprint('health', __name__)

start_time = time.time()

@health_bp.route('/health', methods=['GET'])
def health():
    uptime = time.time() - start_time
    return jsonify({
        "status": "healthy",
        "model": "llama-3.3-70b-versatile",
        "uptime_seconds": round(uptime, 2),
        "timestamp": datetime.utcnow().isoformat()
    }), 200