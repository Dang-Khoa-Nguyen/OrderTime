
from flask import Blueprint
from flask import request, jsonify
from database.supabase_client import SupabaseClient
from database.supabase_function import SupabaseFunction
from ai_analysist.gemini_service import GenAIService
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

@bp.post("/<int:restaurant_id>")
def upload_menu(restaurant_id):
    SUPABASE_ANON_KEY= SupabaseClient.get_supabase_anon()
    file = request.files["file"]
    if not file:
        return jsonify({"Error": "Missing file"}), 500
    
    ai_response = GenAIService.generate_image_to_json(file, restaurant_id)
    clean_json = clean_json_from_ai(ai_response)
    
    return SupabaseFunction.upload_item(SUPABASE_ANON_KEY, clean_json),200