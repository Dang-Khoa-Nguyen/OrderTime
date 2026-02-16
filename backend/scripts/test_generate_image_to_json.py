import os
import sys
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)
from ai_analysist.gemini_service import GenAIService
from helpers.clean_ai_res import clean_json_from_ai
from pathlib import Path

if __name__ == "__main__":
    image_url = "images/drink_menu.png"
    
    res = GenAIService.generate_image_to_json(image_url,1)
    new_res = clean_json_from_ai(res)
    print(new_res)