from flask import Blueprint, request, jsonify
import os
from datetime import datetime
from services.groq_client import call_groq
from services.sanitiser import sanitise_input

describe_bp = Blueprint('describe', __name__)

@describe_bp.route('/describe', methods=['POST'])
def describe():
    data = request.get_json()

    # Validate input
    if not data:
        return jsonify({"error": "No input provided"}), 400
    
    if 'policy_name' not in data or not data['policy_name']:
        return jsonify({"error": "policy_name is required"}), 400
    
    if 'policy_content' not in data or not data['policy_content']:
        return jsonify({"error": "policy_content is required"}), 400

    # Sanitise input
    try:
        policy_name = sanitise_input(data['policy_name'])
        policy_content = sanitise_input(data['policy_content'])
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    # Load prompt
    prompt_path = os.path.join(os.path.dirname(__file__), '../prompts/describe_prompt.txt')
    with open(prompt_path, 'r') as f:
        prompt_template = f.read()

    # Fill prompt
    prompt = prompt_template.replace('{policy_name}', policy_name)
    prompt = prompt.replace('{policy_content}', policy_content)

    # Call Groq
    result = call_groq(prompt)

    # Add generated_at
    result['generated_at'] = datetime.utcnow().isoformat()

    return jsonify(result), 200