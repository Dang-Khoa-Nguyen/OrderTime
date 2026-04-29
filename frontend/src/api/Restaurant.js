// The URL link
const API_URL = process.env.REACT_APP_API_URL;

/* This fetch GET the all restaurant with detail information. */
export async function fetchGetRestaurants() {
  // Send get request to backend to get all text
  const res = await fetch(
    `${API_URL}/orders/get_restaurants`
  );

  // Verify the response
  if (!res.ok) {
    throw new Error("Failed to fetch text");
  }

  // Return the json of the response
  return res.json();
}

/* This fetch GET the all restaurant with detail information. */
export async function fetchGetCategories() {
  // Send get request to backend to get all text
  const res = await fetch(
    `${API_URL}/orders/get_categories`
  );

  // Verify the response
  if (!res.ok) {
    throw new Error("Failed to fetch text");
  }

  // Return the json of the response
  return res.json();
}

/* This fetch GET the all restaurant with detail information. */
export async function fetchOrders(payload) {
  // Send get request to backend to get all text
    const res = await fetch(`${API_URL}/orders/speak/${payload.restaurantId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      speed: payload.speed,
      tone: payload.tone,
    }),
  });

  if (!res.ok) {
    const text = await res.text(); 
    console.error("Error response:", text);
    throw new Error("Request failed");
  }

  const data = await res.json();
  
  // Return the json of the response
  return data;
}

/* This fetch GET the items of the specific restaurant */
export async function fetchRestaurantMenu(restaurantId) {
  // Send get request to backend to get all text
  const res = await fetch(
    `${API_URL}/orders/get_items/${restaurantId}`,
    {
      method: "GET",
    });

  // Verify the response
  if (!res.ok) {
    const error = await res.json();
    console.error("Server error:", error); 
    throw new Error(error.message || "Failed to upload menu");
  }

  // Return the json of the response
  return res.json();
}

/* This fetch GET the all restaurant with detail information. */
export async function fetchUploadMenu(formData,restaurantId) {
  // Send get request to backend to get all text
  const res = await fetch(
    `${API_URL}/orders/${restaurantId}`,
    {
      method: "POST",
      body: formData,
    });

  // Verify the response
  if (!res.ok) {
    const error = await res.json();
    console.error("Server error:", error); 
    throw new Error(error.message || "Failed to upload menu");
  }

  // Return the json of the response
  return res.json();
}

/* This function deletes the specific restaurant with its items. */
export async function fetchDeleteRestaurant(restaurantId) {
  // Send get request to backend to get all text
  const res = await fetch(
    `${API_URL}/orders/${restaurantId}`,
    {
      method: "DELETE",
    });

  // Verify the response
  if (!res.ok) {
    const error = await res.json();
    console.error("Server error:", error); 
    throw new Error(error.message || "Failed to upload menu");
  }

  // Return the json of the response
  return res.json();
}

/* This function deletes the specific item. */
export async function fetchDeleteItem(itemId) {
  // Send get request to backend to get all text
  const res = await fetch(
    `${API_URL}/orders/delete_item/${itemId}`,
    {
      method: "DELETE",
    });

  // Verify the response
  if (!res.ok) {
    const error = await res.json();
    console.error("Server error:", error); 
    throw new Error(error.message || "Failed to upload menu");
  }

  // Return the json of the response
  return res.json();
}

/* This function deletes the specific restaurant with its items. */
export async function fetchAddItem(formData) {
  // Send get request to backend to get all text
  const res = await fetch(
    `${API_URL}/orders/add_item`,
    {
      method: "POST",
      body: formData
    });

  // Verify the response
  if (!res.ok) {
    const error = await res.json();
    console.error("Server error:", error); 
    throw new Error(error.message || "Failed to upload menu");
  }

  // Return the json of the response
  return res.json();
}

