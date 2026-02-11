// The URL link
const API_URL = "http://127.0.0.1:5000";

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
export async function fetchOrders(restaurantId) {
  // Send get request to backend to get all text
  const res = await fetch(
    `${API_URL}/orders/${restaurantId}`
  );

  // Verify the response
  if (!res.ok) {
    throw new Error("Failed to fetch text");
  }

  // Return the json of the response
  return res.json();
}