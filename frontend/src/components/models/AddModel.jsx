import { useState, useRef, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import useRestaurant from "../../hooks/useRestaurant";

export default function AddModal({ onClose, onSave }) {
    const fileInputRef = useRef(null);

    /*-------------- Variables ----------------*/
    const [uploading, setUploading] = useState(false);
    const [name, setName] = useState("");
    const [restaurant, setRestaurant] = useState("");
    const [file, setFile] = useState(null);
    const {restaurants, loading, error} = useRestaurant();

    /*---------- Initial ---------*/
    
    /*-------------- Handle Change File ----------------*/
    const handleFileChange = async (e) => {
        const selected = e.target.files?.[0];
        if (!selected) return;

        setFile(selected);
    }

    /*-------------- Handle Submit ----------------*/
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            restaurant_name: name,
            restaurant_category: restaurant,
            file:file
        });
    };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-96"
      >
        <h2 className="text-lg font-bold mb-4">Create Menu</h2>

        <div className="flex flex-col">
          <label className="text-xs text-gray-500 font-semibold mb-1">
            Restaurants
          </label>

          <select
            value={restaurant}
            onChange={(e) => setRestaurant(e.target.value)}
            className="w-full border p-2 mb-4 bg-white rounded-lg"
          >
            <option value="">Select available restaurant</option>
            <option value="New"> New restaurant </option>
            {restaurants.map((res) => (
              <option key={res.id} value={res.name}>
                {res.name}
              </option>
            ))}
          </select>
        </div>
        
                
        <div className={`flex flex-col`}>
          <label className="text-xs text-gray-500 font-semibold mb-1">
          Name (only available for new restaurant)
          </label>
          <input
          type="text"
          value={name}
          disabled={restaurant !== "New"}
          onChange={(e) => setName(e.target.value)}
          className={`w-full border p-2 mb-4 rounded-lg ${restaurant=="New" ? "" : "cursor-not-allowed"}`}
          maxLength="100"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-gray-500 font-semibold mb-1">
          File
          </label>
        <button 
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center px-4 py-2 
            rounded-lg border border white hover:bg-white hover:text-black
            duration-200 transition text-sm"> 
                <FiPlus/> Add File 
            
        </button>
            <input
            ref={fileInputRef}
            type="file"
            accept=".csv, .pdf, .png, .jpg  "
            className="hidden"
            onChange={handleFileChange}
        />
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