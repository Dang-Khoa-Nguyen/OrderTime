
from flask import Blueprint
from flask import request, jsonify
from database.supabase_client import SupabaseClient
from database.supabase_function import SupabaseFunction

# The URL for the api to connect
bp = Blueprint("orders", __name__, url_prefix="/orders")

@bp.get("/get_restaurants")
def get_all_restaurants():
    SUPABASE_ANON_KEY= SupabaseClient.get_supabase_anon()
    return SupabaseFunction.get_restaurants(SUPABASE_ANON_KEY)