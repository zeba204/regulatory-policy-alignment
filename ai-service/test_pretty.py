import requests
import json

response = requests.post(
    'http://127.0.0.1:5000/recommend',
    json={
        "policy_name": "GDPR",
        "policy_content": "Organizations must protect personal data of EU citizens"
    }
)

print(json.dumps(response.json(), indent=2))