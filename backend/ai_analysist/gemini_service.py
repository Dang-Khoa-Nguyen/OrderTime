from google import genai
from google.genai import types
import os
import base64
from dotenv import load_dotenv

class GenAIService:
    @staticmethod
    def encode_image(image_url):
        with open(image_url, "rb") as f:
            return base64.b64encode(f.read()).decode()
    
    @staticmethod
    def generate_image_to_json(image_url):
        load_dotenv()

        client = genai.Client(api_key=os.getenv("NEXT_GEMINI_API_KEY"))

        model = "gemini-3-flash-preview"
        
        base64_image = GenAIService.encode_image(image_url)
        prompt = """
        You have a task to extract menu items. You must only extract exact items in the given image with name, category, price.
        You must not add any extra items that are not in the given image.
        You must return ONLY valid JSON. Format:\n
        [{\"name\": string,\"category\": string, \"price\": number}]. category must be either food or drink. 
        No explanation text. 
        if there are more items then store all JSON in the list and return it.
        if the name of an item is upcase, you should write it as lowcase. 
        """  
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