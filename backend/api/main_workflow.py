
from fastapi import APIRouter, File, UploadFile, Form, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from database.supabase_client import SupabaseClient
from database.supabase_function import SupabaseFunction
from ai_analysist.gemini_service import GenAIService
from ai_analysist.eleven_service import ElevenService
from helpers.clean_ai_res import clean_json_from_ai

# The URL for the api to connect
router = APIRouter(prefix="/orders")

class SpeakRequest(BaseModel):
    speed: float
    tone: float
    
@router.get("/get_restaurants")
def get_all_restaurants():
    SUPABASE_ANON_KEY= SupabaseClient.get_supabase_anon()
    return SupabaseFunction.get_restaurants(SUPABASE_ANON_KEY)

@router.get("/get_categories")
def get_all_categories():
    SUPABASE_ANON_KEY= SupabaseClient.get_supabase_anon()
    return SupabaseFunction.get_categories(SUPABASE_ANON_KEY)

@router.get("/{restaurant_id}")
def generate_order(restaurant_id: int):
    SUPABASE_ANON_KEY= SupabaseClient.get_supabase_anon()
    return SupabaseFunction.generate_random_order(SUPABASE_ANON_KEY,restaurant_id)

@router.get("/get_items/{restaurant_id}")
def get_item(restaurant_id: int):
    SUPABASE_ANON_KEY= SupabaseClient.get_supabase_anon()
    return SupabaseFunction.get_items(SUPABASE_ANON_KEY, restaurant_id)

@router.post("/speak/{restaurant_id}")
async def speak(restaurant_id: int,  data: SpeakRequest):
    SUPABASE_ANON_KEY= SupabaseClient.get_supabase_anon()
    text = SupabaseFunction.generate_random_order(SUPABASE_ANON_KEY,restaurant_id)
    speed = data.get("speed")
    tone = data.get("tone")
    audio_base64 = ElevenService.generate_voice(text, speed, tone)
    return {"text": text['text'], "audio": audio_base64}

@router.post("/add_item")
async def add_item(request: Request):
    try:
        SUPABASE_ANON_KEY = SupabaseClient.get_supabase_anon()
        item = await request.form()
        print(dict(item))  
        success = SupabaseFunction.add_item(SUPABASE_ANON_KEY, item)
        return {"success": success}
    except Exception as e:
        print(f"ERROR: {e}")
        return JSONResponse({"error": str(e)}, status_code=500)

@router.post("/edit_item")
async def edit_item(request: Request):
    try:
        SUPABASE_ANON_KEY = SupabaseClient.get_supabase_anon()
        item = await request.form()
        print(dict(item))  
        success = SupabaseFunction.edit_item(SUPABASE_ANON_KEY, item)
        return {"success": success}
    except Exception as e:
        print(f"ERROR: {e}")
        return JSONResponse({"error": str(e)}, status_code=500)
    
@router.post("/{restaurant_id}")
async def upload_menu(
    restaurant_id: int,
    file: UploadFile = File(...),
    name: str = Form(None)
):  
    try:
        SUPABASE_ANON_KEY= SupabaseClient.get_supabase_anon()
        if not file:
            return JSONResponse({"error": "Missing file"}, status_code=500)

        file_bytes = await file.read()

        if restaurant_id == 0:
            new_id = SupabaseFunction.upload_new_restaurant(SUPABASE_ANON_KEY,name)
            
            # Return error if new id is None
            if new_id is None:
                return JSONResponse({"error": "Failed to create restaurant"}, status_code=500)
            
            ai_response = GenAIService.generate_image_to_json(file_bytes, new_id)
            clean_json = clean_json_from_ai(ai_response)
            result = SupabaseFunction.upload_item(SUPABASE_ANON_KEY, clean_json)
            return {"success": result}
        else:
            ai_response = GenAIService.generate_image_to_json(file_bytes, restaurant_id)
            clean_json = clean_json_from_ai(ai_response)
            result = SupabaseFunction.upload_item(SUPABASE_ANON_KEY, clean_json)
            return {"success": result}
    except Exception as e:
        # check Flask terminal
        print(f"ERROR: {e}") 
        import traceback
        # prints full traceback
        traceback.print_exc()   
        return {"error": str(e)}

@router.delete("/{restaurant_id}")
def delete_table(restaurant_id: int):
    SUPABASE_ANON_KEY = SupabaseClient.get_supabase_anon()
    success = SupabaseFunction.delete_restaurant(SUPABASE_ANON_KEY, restaurant_id)
    return {"success": success}

@router.delete("/delete_item/{item_id}")
def delete_an_item(item_id: int):
    SUPABASE_ANON_KEY = SupabaseClient.get_supabase_anon()
    success = SupabaseFunction.delete_item(SUPABASE_ANON_KEY, item_id)
    return {"success": success}