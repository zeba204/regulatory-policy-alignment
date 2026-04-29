from services.groq_client import call_groq

prompt = """
You are a regulatory policy expert.
Analyze this policy: GDPR Data Protection Policy
Content: Organizations must protect personal data of EU citizens.

Provide response in JSON format:
{
    "title": "policy title",
    "description": "clear description",
    "key_points": ["point 1", "point 2", "point 3"],
    "impact": "impact of this policy",
    "generated_at": "2026-04-22"
}

Return JSON only.
"""

result = call_groq(prompt)
print(result)