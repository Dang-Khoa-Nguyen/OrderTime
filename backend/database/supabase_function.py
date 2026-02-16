import random

class SupabaseFunction():
    def generate_random_order(SUPABASE_CLIENT_SERVICE,restaurant_id):
        response = (
            SUPABASE_CLIENT_SERVICE
            .table("menu_items")
            .select("id, name, price")
            .eq("restaurant_id", restaurant_id)
            .execute()
        )

        items = response.data

        # Return an announce sentence.
        if not items:
            return {"text": "This restaurant has no menu items."}

        # pick 1–4 random dishes
        count = random.randint(1, min(4, len(items)))
        chosen = random.sample(items, count)

        order_parts = []

        # Get random quantity for each item.
        for item in chosen:
            qty = random.randint(1, 3) 
            order_parts.append(f"{qty} {item['name']}")

        # Make a whole sentence for the AI customers.
        sentence = "I'd like to order " + ", ".join(order_parts)

        return {"text": sentence}

    def get_restaurants(SUPABASE_CLIENT_SERVICE):
        # Fetch all restaurant
        response = (
            SUPABASE_CLIENT_SERVICE
            .table("restaurant_name")
            .select("id, name")
            .execute()
        )

        return response.data if response.data else []
    
    def get_category_info(SUPABASE_CLIENT_SERVICE):
        response = (
            SUPABASE_CLIENT_SERVICE
            .table("category")
            .select("id, category_name")
            .execute()
        )
        
        return response.data if response.data else []
    
    def upload_item(SUPABASE_CLIENT_SERVICE,item):
        try:
            response = (
                SUPABASE_CLIENT_SERVICE
                .table("menu_items")
                .insert({
                "name": item["name"],
                "category_id": item["category_id"],
                "price": float(item["price"]),
                "restaurant_id": item["restaurant_id"],
                })
                .execute()
            )
            return True
        
        except Exception as e:
            return e