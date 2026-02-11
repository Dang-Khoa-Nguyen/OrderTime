import useRestaurant from "../../hooks/useRestaurant"
import {useState, useEffetc} from "react";

export default function RestaurantSelector() {
    const {restaurants, loading, error} = useRestaurant();
    if (loading) {
        return (<div> Loading.... </div>)
    }

    if (error) {
        return (<div> It's error </div>)
    }
    return(
        <div className="w-full text-black">
            <select className="h-8 w-80 rounded-lg m-3 px-2 text-lg">
                {restaurants.map( (res) => (
                    <option key={res.id} value={res.name}> {res.name} </option>
                ))}
            </select>
        </div>
    )
}
