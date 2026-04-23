export default function MenuLoader() {
  return (
     <div className="p-6 w-full mx-auto animate-pulse">
      {/* Title skeleton */}
      <div className="h-8 bg-gray-700 rounded w-1/3 mx-auto mb-4" />

      {/* Disabled select skeleton */}
      <select
        disabled
        className="mb-4 px-3 py-2 bg-gray-100 border border-gray-200 
        rounded-xl text-sm text-gray-400 appearance-none cursor-not-allowed opacity-60"
      >
        <option>Loading...</option>
      </select>

      {/* Table skeleton */}
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
            {Array.from({ length: 8 }).map((_, i) => (
              <tr
                key={i}
                className={`border-b border-gray-700 ${
                  i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                }`}
              >
                {/* Item name */}
                <td className="px-6 py-3">
                  <div className="h-3 bg-gray-700 rounded w-3/4" />
                </td>
                {/* Price */}
                <td className="px-6 py-3">
                  <div className="h-3 bg-gray-700 rounded w-12" />
                </td>
                {/* Category badge */}
                <td className="px-6 py-3">
                  <div className="h-5 bg-gray-700 rounded-full w-14" />
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}