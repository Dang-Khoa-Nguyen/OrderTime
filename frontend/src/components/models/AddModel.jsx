import { useState, useRef } from "react";
import { FiPlus, FiFile, FiX } from "react-icons/fi";
import useRestaurant from "../../hooks/useRestaurant";

export default function AddModal({ onClose, onSave }) {
    const fileInputRef = useRef(null);

    /*-------------- Variables ----------------*/
    const [uploading, setUploading] = useState(false);
    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [restaurantId, setRestaurantId] = useState("");
    const {restaurants, loading, error} = useRestaurant();
    /*---------- Initial ---------*/
    
    /*-------------- Handle Change File ----------------*/
    const handleFileChange = async (e) => {
        const selected = e.target.files?.[0];
        if (!selected) return;
        setSelectedFile(selected);
        fileInputRef.current = selected;
    }

    /*-------------- Handle Submit ----------------*/
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate input
        if (!selectedFile) {
            alert("Please select a file.");
            return;
        }
        if (!restaurantId) {
            alert("Please select a restaurant.");
            return;
        }
        if (restaurantId === "0" && !name) {
            alert("Please enter a restaurant name.");
            return;
        }
        const formData = new FormData();
        console.log(selectedFile)
        setUploading(true)
        formData.append("restaurant_id", restaurantId)
        formData.append("name", name);
        formData.append("file", fileInputRef.current);
        onSave(formData);
        setUploading(false)
    };

    if (error) {
        return(
            <div>
                it's error
            </div>
        )
    }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-96"
      >
        <h2 className="text-lg font-bold mb-4">Create Menu</h2>

        <div className="flex flex-col">
          <label className="text-xs text-gray-500 font-semibold mb-1">
            Restaurants
          </label>
        
            {loading ? ( <select
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            className="w-full border p-2 mb-4 bg-gray-300 rounded-lg cursor-not-allowed"
          >
            <option> Loading restaurants... </option>
        </select>) : (
            <select
            value={restaurantId}
            onChange={(e) => setRestaurantId(e.target.value)}
            className="w-full border p-2 mb-4 bg-white rounded-lg"
          >
            <option value="">Select available restaurant</option>
            <option key="0" value="0"> New restaurant </option>
            {restaurants.map((res) => (
              <option key={res.id} value={res.name}>
                {res.name}
              </option>
            ))}
          </select>
        )}
          
        </div>
        
                
        <div className={`flex flex-col`}>
          <label className="text-xs text-gray-500 font-semibold mb-1">
          Name (only available for new restaurant)
          </label>
          <input
          type="text"
          value={name}
          disabled={restaurantId !== "0"}
          onChange={(e) => setName(e.target.value)}
          className={`w-full border p-2 mb-4 rounded-lg ${restaurantId==="0" ? "" : "cursor-not-allowed"}`}
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
        className="flex items-center px-4 py-2 rounded-lg border border-white 
        hover:bg-white hover:text-black duration-200 transition text-sm"
    >
        <FiPlus /> Add File
    </button>
    <input
        ref={fileInputRef}
        type="file"
        accept=".csv, .pdf, .png, .jpg"
        className="hidden"
        onChange={handleFileChange}
    />

    {/* Show selected file info */}
    {selectedFile && (
        <div className="mt-2 flex items-center gap-2 p-2 border rounded-lg bg-gray-50">
            {/* Image preview */}
            {selectedFile.type.startsWith("image/") ? (
                <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="preview"
                    className="w-10 h-10 object-cover rounded"
                />
            ) : (
                <FiFile className="text-gray-400 text-xl" />
            )}

            {/* File name + size */}
            <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium text-gray-700 truncate">
                    {selectedFile.name}
                </span>
                <span className="text-xs text-gray-400">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                </span>
            </div>

            {/* Remove button */}
            <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="ml-auto text-gray-400 hover:text-rose-500"
            >
                <FiX />
            </button>
        </div>
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