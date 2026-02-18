from google import genai
from google.genai import types
import os
import sys
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)
import base64
from database.supabase_function import SupabaseFunction
from database.supabase_client import SupabaseClient
from dotenv import load_dotenv


class GenAIService:
    @staticmethod
    def encode_image(image_url):
        with open(image_url, "rb") as f:
            return base64.b64encode(f.read()).decode()
    
    @staticmethod
    def generate_image_to_json(image_url, restaurant_id):
        load_dotenv()

        SUPABASE_CLIENT_ANON = SupabaseClient.get_supabase_anon()
        category_info = SupabaseFunction.get_category_info(SUPABASE_CLIENT_ANON)
        client = genai.Client(api_key=os.getenv("NEXT_GEMINI_API_KEY"))

        model = "gemini-3-flash-preview"
        
        base64_image = GenAIService.encode_image(image_url)
        prompt = (
            """
            You have a task to extract menu items. You must only extract exact items in the given image with name, category, price.
            You must not add any extra items that are not in the given image.
            You must return ONLY valid JSON. Format:
            [{"name": string, "category_id": category_id, "price": number, "restaurant_id": restaurant_id}].
            category must be either food or drink.
            No explanation text.
            if the name of an item is upcase, you should write it as lowcase.
            """
            f"This is a restaurant_id:{restaurant_id}. Please add it to the JSON. "
            f"The category_id should be set in this list: {category_info}. You should set by id, not category_name"
        )
        
        res = client.models.generate_content(
            model=model,
            contents=[
                types.Part.from_bytes(
                data=base64_image,
                mime_type="image/png"
            ),
            f"{prompt}"],
            config=types.GenerateContentConfig(
                response_mime_type="application/json", 
                temperature=0.1
            )   
        )

        return res