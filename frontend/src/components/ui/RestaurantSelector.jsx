import useRestaurant from "../../hooks/useRestaurant"

export default function RestaurantSelector({setRestaurantId}) {
    const {restaurants, loading, error} = useRestaurant();

    if (error) {
        return (<div> It's error </div>)
    }
    return(
        <div className="w-full text-black">
            {loading ? (
                <select className="h-8 w-80 rounded-lg m-3 px-2 text-lg">
                    <option key="0" value="0"> Loading....</option>
                    </select>
                ) : (
                <select className="h-8 w-80 rounded-lg m-3 px-2 text-lg" onChange={(e) => setRestaurantId(e.target.value)}>
                    <option key="0" value="0"> Select restaurants </option>
                    {restaurants.map( (res) => (
                        <option key={res.id} value={res.id}> {res.name} </option>
                    ))}
                </select>
            )}
           
        </div>
    )
}
