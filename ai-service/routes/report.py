from flask import Blueprint, request, jsonify
import os
from datetime import datetime
from services.groq_client import call_groq

report_bp = Blueprint('report', __name__)

@report_bp.route('/generate-report', methods=['POST'])
def generate_report():
    data = request.get_json()

    # Validate input
    if not data:
        return jsonify({"error": "No input provided"}), 400
    
    if 'policy_name' not in data or not data['policy_name']:
        return jsonify({"error": "policy_name is required"}), 400
    
    if 'policy_content' not in data or not data['policy_content']:
        return jsonify({"error": "policy_content is required"}), 400

    # Load prompt
    prompt_path = os.path.join(os.path.dirname(__file__), '../prompts/report_prompt.txt')
    with open(prompt_path, 'r') as f:
        prompt_template = f.read()

    # Fill prompt
    prompt = prompt_template.replace('{policy_name}', data['policy_name'])
    prompt = prompt.replace('{policy_content}', data['policy_content'])

    # Call Groq
    result = call_groq(prompt)

    # Add generated_at
    result['generated_at'] = datetime.utcnow().isoformat()

    return jsonify(result), 200