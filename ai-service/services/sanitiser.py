import re

def sanitise_input(text: str) -> str:
    if not text:
        return text
    
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    
    # Detect prompt injection
    injection_keywords = [
        'ignore previous instructions',
        'ignore all instructions',
        'system prompt',
        'jailbreak',
        'forget everything'
    ]
    
    text_lower = text.lower()
    for keyword in injection_keywords:
        if keyword in text_lower:
            raise ValueError(f"Invalid input detected")
    
    return text.strip()