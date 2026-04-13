import useRestaurant from "../../hooks/useRestaurant"

export default function RestaurantSelector({setRestaurantId}) {
    const {restaurants, loading, error} = useRestaurant();

    if (error) {
        return (<div> It's error </div>)
    }
    return(
        <div className="relative w-80">
            {loading ? (
                <select
                    disabled
                    className="w-full h-11 pl-3 pr-10 bg-gray-100 border border-gray-200 
                    rounded-xl text-sm text-gray-400 appearance-none cursor-not-allowed opacity-60"
                >
                    <option>Loading...</option>
                </select>
            ) : (
                <select
                    onChange={(e) => setRestaurantId(e.target.value)}
                    className="w-full h-11 pl-3 pr-10 bg-white border border-gray-200 
                    rounded-xl text-sm text-gray-800 appearance-none cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                    hover:border-gray-300 transition-colors duration-150"
                >
                    <option value="">Select a restaurant</option>
                    {restaurants.map((res) => (
                        <option key={res.id} value={res.id}>{res.name}</option>
                    ))}
                </select>
            )}

            {/* Custom chevron */}
            <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                width="14" height="14" viewBox="0 0 16 16" fill="none"
            >
                <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}
