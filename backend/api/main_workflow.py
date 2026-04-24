
from flask import Blueprint
from flask import request, jsonify, Response
from database.supabase_client import SupabaseClient
from database.supabase_function import SupabaseFunction
from ai_analysist.gemini_service import GenAIService
from ai_analysist.eleven_service import ElevenService
from helpers.clean_ai_res import clean_json_from_ai

# The URL for the api to connect
bp = Blueprint("orders", __name__, url_prefix="/orders")

@bp.get("/get_restaurants")
def get_all_restaurants():
    SUPABASE_ANON_KEY= SupabaseClient.get_supabase_anon()
    return SupabaseFunction.get_restaurants(SUPABASE_ANON_KEY)

@bp.get("/<int:restaurant_id>")
def generate_order(restaurant_id):
    SUPABASE_ANON_KEY= SupabaseClient.get_supabase_anon()
    return SupabaseFunction.generate_random_order(SUPABASE_ANON_KEY,restaurant_id)

@bp.get("/get_items/<int:restaurant_id>")
def get_item(restaurant_id):
    SUPABASE_ANON_KEY= SupabaseClient.get_supabase_anon()
    return SupabaseFunction.get_items(SUPABASE_ANON_KEY, restaurant_id)

@bp.post("/speak/<int:restaurant_id>")
def speak(restaurant_id):
    SUPABASE_ANON_KEY= SupabaseClient.get_supabase_anon()
    text = SupabaseFunction.generate_random_order(SUPABASE_ANON_KEY,restaurant_id)
    data = request.get_json()
    speed = data.get("speed")
    tone = data.get("tone")
    audio_base64 = ElevenService.generate_voice(text, speed, tone)
    print(speed)
    return jsonify({
        "text": text['text'],
        "audio": audio_base64
    })

@bp.post("/<int:restaurant_id>")
def upload_menu(restaurant_id):
    try:
        SUPABASE_ANON_KEY= SupabaseClient.get_supabase_anon()
        file = request.files.get("file")
        if not file:
            return jsonify({"Error": "Missing file"}), 500
        
        # If restaurant is new, add restaurant name and then add item
        # else, add an new item to the restaurant.
        if restaurant_id == 0:
            # Get name and get new id of the restaurant
            restaurant_name = request.form.get("name") 
            new_id = SupabaseFunction.upload_new_restaurant(SUPABASE_ANON_KEY, restaurant_name)
            
            print(f"Restaurant name received: {restaurant_name}")
            print(f"New ID returned: {new_id}")
            
            # Return error if new id is None
            if new_id is None:
                return jsonify({"error": "Failed to create restaurant"}), 500
            
            # Handle generate and add items to the specific restaurant.
            ai_response = GenAIService.generate_image_to_json(file, new_id)
            clean_json = clean_json_from_ai(ai_response)
            result = SupabaseFunction.upload_item(SUPABASE_ANON_KEY, clean_json)
            return jsonify({"success": result}), 200 
        else:     
            ai_response = GenAIService.generate_image_to_json(file, restaurant_id)
            clean_json = clean_json_from_ai(ai_response)       
            result = SupabaseFunction.upload_item(SUPABASE_ANON_KEY, clean_json)
            return jsonify({"success": result}), 200 
    
    except Exception as e:
        print(f"❌ ERROR: {e}")  # 👈 check Flask terminal
        import traceback
        traceback.print_exc()   # 👈 prints full traceback
        return jsonify({"error": str(e)}), 500

@bp.delete("/<int:restaurant_id>")
def delete_table(restaurant_id):
    SUPABASE_ANON_KEY= SupabaseClient.get_supabase_anon()
    success =  SupabaseFunction.delete_restaurant(SUPABASE_ANON_KEY,restaurant_id)
    return {"success": success} 