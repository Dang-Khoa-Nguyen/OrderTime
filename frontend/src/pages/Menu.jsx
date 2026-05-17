import { useState, useEffect } from "react";
import { fetchDeleteRestaurant, fetchRestaurantMenu, fetchAddItem, fetchDeleteItem, fetchEditItem } from "../api/Restaurant";
import useRestaurant from "../hooks/useRestaurant"
import MenuLoader from "../components/loader/MenuLoader";
// import DeleteRestaurant from "../components/common/DeleteRestaurant";
import AddItem from "../components/common/AddItem";
import AddItemModel from "../components/models/AddItemModel";
import EditItemModel from "../components/models/EditItemModel";
import RestaurantController from "../components/controllers/RestaurantController";

// Import icons
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { FaStore } from "react-icons/fa";


export default function Menu() {
  const [items, setItems] = useState([])
  const [restaurantId, setRestaurantId] = useState(0)
  const {restaurants, loading, error} = useRestaurant();
  const [openCreate, setOpenCreate] = useState(false);
  const [editItem, setEditItem] = useState(null) 
  console.log(restaurantId)
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
  
  const handleEdit = async (formData) => {
    const data = await fetchEditItem(formData)
    if (data.success) {
      fetchRestaurantMenu(restaurantId).then(data => setItems(data))
      setEditItem(null)  
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
      <h2 className="flex items-center justify-center h-20 font-grotesk text-center mb-4 text-3xl font-manrope text-white -mt-3">Menu Restaurants </h2>

      <div className="flex justify-between items-center">
        <div className="flex gap-5 pb-3">
          {loading ? (
          <select
            disabled
            className="mb-4 px-3 py-2 bg-gray-100 border border-gray-200
            rounded-xl text-sm text-gray-400 appearance-none cursor-not-allowed opacity-60"
            >
              <option>Loading...</option>
            </select>) : (
              <select 
                onChange={(e) => setRestaurantId(parseInt(e.target.value))}
                className="pl-3 pr-9 py-2 rounded-md bg-gray-800 text-white 
                border border-gray-200 focus:outline-none text-sm">
                  <option key={0} value={0} className="h-8"> Select restaurant </option>
                  {restaurants.map((res) => (
                      <option key={res.id} value={res.id}>{res.name}</option>
                  ))}
              </select>
            )}

            <RestaurantController handleDelete={handleDelete}/>
        </div>

        {/* <DeleteRestaurant handleDelete={handleDelete}/>*/}
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
          {restaurantId !==0 && (
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
                  <button 
                  className="text-blue-500 text-lg"
                  onClick={() => setEditItem(item)} > <MdModeEdit/> </button>
                  <button className="text-red-500 text-lg" 
                  onClick={() => handleDeleteItem(item.id)}> <MdDelete/> </button>
                </td>
              </tr>
            ))}
          </tbody>
          ) }
        </table>
        {editItem && (
          <EditItemModel
            item={editItem}
            onClose={() => setEditItem(null)}
            onSave={handleEdit}
          />
        )}
      </div>

      {restaurantId===0 && (
        <div className="w-full h-48 flex flex-col items-center justify-center text-white gap-3">
          <FaStore className="text-3xl"/>
          <p> Select the restaurant above to view its menu </p>
        </div>
      )} 
    </div>
  );
}