import json
def clean_json_from_ai(res):
    # 1. Access the text attribute from the Gemini Part object
    raw_text = res.candidates[0].content.parts[0].text

    # 2. Clean the string (remove markdown backticks if they exist)
    clean_json = raw_text.strip().replace("```json", "").replace("```", "")

    # 3. Convert string to a Python list/dictionary
    data = json.loads(clean_json)
    
    return data