import { useState, useEffect } from "react";
import { fetchDeleteRestaurant, fetchRestaurantMenu, fetchAddItem, fetchDeleteItem } from "../api/Restaurant";
import useRestaurant from "../hooks/useRestaurant"
import MenuLoader from "../components/loader/MenuLoader";
import DeleteRestaurant from "../components/common/DeleteRestaurant";
import AddItem from "../components/common/AddItem";
import AddItemModel from "../components/models/AddItemModel";

// Import icons
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

export default function Menu() {
  const [items, setItems] = useState([])
  const [restaurantId, setRestaurantId] = useState(0)
  const {restaurants, loading, error} = useRestaurant();
  const [openCreate, setOpenCreate] = useState(false);

  const handleDelete = async () => {
      await fetchDeleteRestaurant(restaurantId);
  }

  const handleAdd = async (formData) => {
      const data = await fetchAddItem(formData);
      if (data.success) {
        // re-fetch instead of reloading the whole page
        fetchRestaurantMenu(restaurantId).then(data => setItems(data))
        setOpenCreate(false);
    }
  }

  const handleDeleteItem = async (itemId) => {
    console.log(itemId)
    const data = await fetchDeleteItem(itemId)
    if (data.success) {
      fetchRestaurantMenu(restaurantId).then(data => setItems(data))
    }
  }
  
  useEffect(() => {
      fetchRestaurantMenu(restaurantId).then(data => setItems(data))
  }, [restaurantId])

  if (error) {
        return (<div> It's error </div>)
  }
  if (loading) return <MenuLoader/>


  return (
    <div className="p-6 w-5/6 mx-auto">
      <h2 className="font-semibold text-center mb-4 text-3xl font-manrope text-white/70 -mt-3">Menu Restaurants </h2>

      <div className="flex gap-5">
      {loading ? (
      <select
        disabled
        className="mb-4 px-3 py-2 bg-gray-100 border border-gray-200
        rounded-xl text-sm text-gray-400 appearance-none cursor-not-allowed opacity-60"
        >
          <option>Loading...</option>
        </select>) : (
          <select 
            onChange={(e) => setRestaurantId(e.target.value)}
            className="mb-4 px-3 py-2 rounded-md bg-gray-800 text-white 
            border border-gray-200 focus:outline-none text-sm">
              <option key={0} value={0}> Select restaurant </option>
              {restaurants.map((res) => (
                  <option key={res.id} value={res.id}>{res.name}</option>
              ))}
          </select>
        )}
        <DeleteRestaurant handleDelete={handleDelete}/>
        <AddItem setOpenCreate={setOpenCreate}/>

         {openCreate && (
            <AddItemModel
                onClose={() => setOpenCreate(false)}
                onSave={handleAdd}
            />)
          }
      </div>
      <div className="overflow-x-auto rounded-lg border border-yellow-500">
        <table className="w-full text-sm text-left text-white">

          <thead className="bg-yellow-500 text-gray-900 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 w-1/2">Item Name</th>
              <th className="px-6 py-3 w-24">Price</th>
              <th className="px-6 py-3 w-28">Category</th>
              <th className="px-6 py-3 w-32"> Actions </th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, i) => (
              <tr
                key={i}
                className={`border-b border-gray-700 hover:bg-gray-700 transition-colors ${
                  i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                }`}
              >
                <td className="px-6 py-3">{item.name}</td>
                <td className="px-6 py-3">${item.price.toFixed(2)}</td>
                <td className="px-6 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.category === "food"    ? "bg-blue-900 text-blue-300" :
                    item.category === "drink" ? "bg-green-900 text-green-300" :
                    item.category === "dessert" ? "bg-pink-900 text-pink-300" :
                    "bg-gray-700 text-gray-300"
                  }`}>
                    {item.category}
                  </span>
                </td>
                {/*TODO: Do the Edit and Delete*/}
                <td className="px-6 py-3 gap-3 flex">
                  <button className="text-blue-500 text-lg"> <MdModeEdit/> </button>
                  <button className="text-red-500 text-lg" 
                  onClick={() => handleDeleteItem(item.id)}> <MdDelete/> </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}