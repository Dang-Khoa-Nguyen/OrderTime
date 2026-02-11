

class SupabaseFunction():
    def get_food_from_restaurant(SUPABASE_CLIENT_SERVICE, restaurant_name):
        #TODO: Should return the list of JSON include food name of the specific restaurant.
        return None
    
    def get_food_from_restaurant(SUPABASE_CLIENT_SERVICE,restaurant_name):
        #TODO: Should return the list of JSON include food name of the specific restaurant.
        return None
    
    def get_restaurants(SUPABASE_CLIENT_SERVICE):
        # Fetch all restaurant
        response = (
            SUPABASE_CLIENT_SERVICE
            .table("restaurant_name")
            .select("id, name")
            .execute()
        )

        return response.data if response.data else []
    
    def upload_menu(SUPABASE_CLIENT_SERVICE,restaurant):
        #TODO: Return Boolean
        return None