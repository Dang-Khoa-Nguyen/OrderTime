

const menuItems = [
  { name: "Margherita Pizza", price: 12.99, category: "Main" },
  { name: "Caesar Salad", price: 8.50, category: "Starter" },
  { name: "Grilled Chicken", price: 15.99, category: "Main" },
  { name: "Chocolate Lava Cake", price: 6.99, category: "Dessert" },
  { name: "Garlic Bread", price: 4.50, category: "Starter" },
];

export default function Menu() {
  return (
    <div className="p-6 w-3/4 mx-auto">
      <h2 className="font-semibold text-center mb-4 text-3xl font-manrope text-white/70 -mt-3">Menu Restaurants </h2>

      <select className="mb-4 px-3 py-2 rounded-md bg-gray-800 text-white border border-yellow-500 focus:outline-none">
        <option>Restaurant 1</option>
        <option>Restaurant 2</option>
      </select>

      <div className="overflow-x-auto rounded-lg border border-yellow-500">
        <table className="w-full text-sm text-left text-white">

          <thead className="bg-yellow-500 text-gray-900 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Item Name</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Category</th>
            </tr>
          </thead>

          <tbody>
            {menuItems.map((item, i) => (
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
                    item.category === "Main"    ? "bg-blue-900 text-blue-300" :
                    item.category === "Starter" ? "bg-green-900 text-green-300" :
                    item.category === "Dessert" ? "bg-pink-900 text-pink-300" :
                    "bg-gray-700 text-gray-300"
                  }`}>
                    {item.category}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}