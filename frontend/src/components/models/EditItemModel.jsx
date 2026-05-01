import { useState } from "react";
import useCategories from "../../hooks/useCategory";

export default function EditItemModel({ item, onClose, onSave }) {
    const [name, setName] = useState(item.name)
    const [price, setPrice] = useState(item.price)
    const [categoryId, setCategoryId] = useState(item.category_id)
    const {categories, categoryLoading, categoryError} = useCategories();

    const handleSubmit = () => {
        const formData = new FormData()
        formData.append("id", item.id)
        formData.append("name", name)
        formData.append("price", price)
        formData.append("category", categoryId)
        onSave(formData)
    }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-96">
        <h3 className="text-white text-lg font-medium mb-4">Edit item</h3>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-gray-400 text-xs uppercase mb-1 block">Item name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
            />
          </div>
          <div>
            <label className="text-gray-400 text-xs uppercase mb-1 block">Price</label>
            <input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
            />
          </div>
          <div>
            <label className="text-gray-400 text-xs uppercase mb-1 block">Category (currently: {item.category})</label>
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
            {categories.map((res) => (
              <option key={res.id} value={res.id}>
                {res.category_name}
              </option>
            ))}
          </select>
          )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-400 border border-gray-600 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-blue-700 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}