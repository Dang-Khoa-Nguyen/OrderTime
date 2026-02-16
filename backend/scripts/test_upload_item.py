import os
import sys
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)
from database.supabase_function import SupabaseFunction
from database.supabase_client import SupabaseClient

if __name__ == "__main__":
    SUPABASE_CLIENT_ANON = SupabaseClient.get_supabase_anon()
    item = {
        "name": "Banh mi gam gam",
        "price": 8.00,
        "category_id": 1,
        "restaurant_id": 1,
    }
    print(SupabaseFunction.upload_item(SUPABASE_CLIENT_ANON, item))