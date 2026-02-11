import os
import sys
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, project_root)
from database.supabase_function import SupabaseFunction
from database.supabase_client import SupabaseClient

if __name__ == "__main__":
    SUPABASE_CLIENT_ANON = SupabaseClient.get_supabase_anon()
    print(SupabaseFunction.get_restaurants(SUPABASE_CLIENT_ANON))