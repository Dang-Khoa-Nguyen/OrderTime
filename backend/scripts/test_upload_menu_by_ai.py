import os
import sys
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)
from database.supabase_function import SupabaseFunction
from database.supabase_client import SupabaseClient
from ai_analysist.gemini_service import GenAIService
from helpers.clean_ai_res import clean_json_from_ai

if __name__ == "__main__":
    SUPABASE_CLIENT_ANON = SupabaseClient.get_supabase_anon()
    image_url = "images/drink_menu.png"
    
    res = GenAIService.generate_image_to_json(image_url, 1)
    item = clean_json_from_ai(res)
    print(item)
    if len(item) > 1:
        count = 0
        for i in item:
            print(i)
            print(SupabaseFunction.upload_item(SUPABASE_CLIENT_ANON, i), count)
            count+=1   
    else:
        print(SupabaseFunction.upload_item(SUPABASE_CLIENT_ANON, item[0]))