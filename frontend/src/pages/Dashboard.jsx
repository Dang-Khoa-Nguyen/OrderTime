// component imports
import RestaurantSelector from "../components/ui/RestaurantSelector"
import Introduction from "../components/ui/Introduction"
import StartOrder from "../components/ui/StartOrder"

// icon imports
import { RiSpeakFill } from "react-icons/ri";
import { fetchOrders } from "../api/Restaurant";
import {useState} from "react";

export default function Dashboard() {
    const [restaurantId, setRestaurantId] = useState(0);
    console.log(restaurantId)
    const speak = (text) => {
        const msg = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(msg);
    };

    const getOrder = async () => {
        if (restaurantId === 0) {
            alert("Please choose the restaurant")
        } else {
            const orders = await fetchOrders(restaurantId);
            speak(orders.text);
        }
    };
    return(
        <div className="text-white text-center w-full h-full"> 
            <div className="flex-2 flex flex-col justify-center items-center gap-3 h-full">
                <Introduction/>
                <RiSpeakFill className="text-white text-3xl"/>
                <RestaurantSelector setRestaurantId={setRestaurantId}/>
                <StartOrder getOrder={getOrder}/>
            </div>
        </div>
    )
}