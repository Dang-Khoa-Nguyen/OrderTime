import {useState, useEffect} from "react"
import { fetchGetCategories } from "../api/Restaurant"

export default function useCategories(){
    const [categories, setCategories] = useState([])
    const [categoryLoading, setLoading] = useState(false)
    const [categoryError, setError] = useState(null)

    useEffect(() => {
        async function load() {
            try {
                setLoading(true)
                const data = await fetchGetCategories();
                setCategories(data ?? []);
                setError(null);
            } catch(e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [])

    return {categories, categoryLoading, categoryError}
}