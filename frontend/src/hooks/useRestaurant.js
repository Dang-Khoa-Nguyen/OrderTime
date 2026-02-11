import {useState, useEffect} from "react"
import { fetchGetRestaurants } from "../api/Restaurant"

export default function useRestaurant(){
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function load() {
            try {
                setLoading(true)
                const data = await fetchGetRestaurants();
                setRestaurants(data ?? []);
                setError(null);
            } catch(e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [])

    return {restaurants, loading, error}
}