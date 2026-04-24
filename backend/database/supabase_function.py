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
        sentence = "I'd like to order " + ", ".join(order_parts) + ". That's all I need. Thank you!"

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
    
    def get_categories(SUPABASE_CLIENT_SERVICE):
        # Fetch all restaurant
        response = (
            SUPABASE_CLIENT_SERVICE
            .table("category")
            .select("id, category_name")
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
    
    def get_items(SUPABASE_CLIENT_SERVICE, restaurant_id):
        
        response = (
            SUPABASE_CLIENT_SERVICE
            .table("menu_items")
            .select("name,price,category(category_name)")
            .eq("restaurant_id", int(restaurant_id))
            .execute()
        )
        
        items = response.data
        if len(items) == 0:
            return []
        
        for item in items:
            item["category"] = item.pop("category", {}).get("category_name")

        return items
    
    def add_item(SUPABASE_CLIENT_SERVICE,item):
        # Check if item already exists
        existing = (
            SUPABASE_CLIENT_SERVICE
            .table("menu_items")
            .select("*")
            .eq("restaurant_id", int(item["restaurant_id"]))
            .eq("name", item["name"])
            .execute()
        )

         # Already exists, then do NOT insert
        if existing.data:
            return False

        # Insert if not exists
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

    def upload_item(SUPABASE_CLIENT_SERVICE, items):
        try:
            for item in items:
                # Check if the item is add or not.
                is_add = SupabaseFunction.add_item(SUPABASE_CLIENT_SERVICE, item)
                
                # Print for checking.
                if not is_add:
                    print("Already have the item", item["name"])
            return True
        except:
            return False

    def get_unique_restaurant_name(SUPABASE_CLIENT_SERVICE, restaurant_name):
        # Check how many restaurants have the same base name
        response = (
            SUPABASE_CLIENT_SERVICE
            .table("restaurant_name")
            .select("name")
            .ilike("name", f"{restaurant_name}%")  
            .execute()
        )

        # no match, use original name
        if not response.data:
            return restaurant_name

        # Extract existing names
        existing_names = [row["name"] for row in response.data]

        # exact name not taken
        if restaurant_name not in existing_names:
            return restaurant_name  

        # find the next available number suffix
        counter = 1
        while f"{restaurant_name}_{counter}" in existing_names:
            counter += 1

        return f"{restaurant_name}_{counter}"

    def upload_new_restaurant(SUPABASE_CLIENT_SERVICE, restaurant_name):
        unique_name = SupabaseFunction.get_unique_restaurant_name(SUPABASE_CLIENT_SERVICE,restaurant_name)
        
        response = (
            SUPABASE_CLIENT_SERVICE
            .table("restaurant_name")
            .insert({"name": unique_name})
            .execute()
        )
        
        # ID is returned in insert response
        if response.data:
            return response.data[0]["id"]  
        
        return None
            
    
    def delete_restaurant(SUPABASE_CLIENT_SERVICE, restaurant_id):
        response_items = (
             SUPABASE_CLIENT_SERVICE
            .table("menu_items")
            .delete()
            .eq("restaurant_id", int(restaurant_id))
            .execute()
        )
        
        if len(response_items.data) == 0:
            return False
        
        response_restaurant = (
            SUPABASE_CLIENT_SERVICE
            .table("restaurant_name")
            .delete()
            .eq("id", int(restaurant_id))
            .execute()
        )
        
        if len(response_restaurant.data) == 0:
            return False
        
        return True