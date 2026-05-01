import { useState } from "react";
import useRestaurant from "../../hooks/useRestaurant";
import useCategories from "../../hooks/useCategory";

export default function AddItemModel({ onClose, onSave }) {
    /*-------------- Variables ----------------*/
    const [uploading, setUploading] = useState(false);
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [restaurantId, setRestaurantId] = useState("");
    const [price, setPrice] = useState(0)
    const {restaurants, loading, error} = useRestaurant();
    const {categories, categoryLoading, categoryError} = useCategories();
    /*-------------- Handle Submit ----------------*/
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!restaurantId) {
            alert("Please select a restaurant.");
            return;
        }

        if (!categoryId) {
            alert("Please select a category.");
            return;
        }
        if (!name) {
            alert("Please enter a item name.");
            return;
        }
        if (!price) {
            alert("Please enter a item price.");
            return;
        }
        const formData = new FormData();
        setUploading(true)
        formData.append("restaurant_id", restaurantId);
        formData.append("name", name);
        formData.append("price", price)
        formData.append("category_id", categoryId);
        onSave(formData);
        setUploading(false)
    };

  if (uploading) {
    <div>
      it's uploading
    </div>
  }

  if (error) {
    <div> it's error </div>
  }

  if (categoryError) {
    <div> category error </div>
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-96"
      >
        <h2 className="text-lg font-bold mb-4">Create Items</h2> 
        <div className="flex flex-col">
          <label className="text-xs text-gray-500 font-semibold mb-1">
            Restaurants
          </label>

          {loading ? (
            <div>
              it's loading
            </div>
          ) : (
                      <select
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            className="w-full border p-2 mb-4 bg-white rounded-lg"
          >
            {restaurants.map((res) => (
              <option key={res.id} value={res.id}>
                {res.name}
              </option>
            ))}
          </select>
          )}
        </div>
        <div className={`flex flex-col`}>
          <label className="text-xs text-gray-500 font-semibold mb-1">
          Item Name 
          </label>
          <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full border p-2 mb-4 rounded-lg cursor-pointer`}
          maxLength="100"
          />
        </div>

        <div className={`flex flex-col`}>
          <label className="text-xs text-gray-500 font-semibold mb-1">
          Price
          </label>
          <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={`w-full border p-2 mb-4 rounded-lg cursor-pointer`}
          maxLength="100"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-gray-500 font-semibold mb-1">
            Categories
          </label>
          
          {categoryLoading ? (
            <div>
              Category loading  
            </div>
          ) : (
            <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border p-2 mb-4 bg-white rounded-lg text-gray-700"
          >
            <option value="">Select Category</option>
            {categories.map((res) => (
              <option key={res.id} value={res.id}>
                {res.category_name}
              </option>
            ))}
          </select>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-5">
            <button type="button" 
            className="bg-rose-500 text-white 
                hover:bg-rose-600 px-3 py-3 rounded-lg" 
            onClick={onClose}>
                Cancel
            </button>
          <button type="submit" 
          className="text-blue-600 font-bold border border-blue-600 px-5 
          py-3 rounded-lg hover:bg-blue-600 hover:text-white duration-500 transition">
            Save
        </button>
        </div>
      </form>
    </div>
  );
}