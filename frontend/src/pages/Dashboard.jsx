// component imports
import RestaurantSelector from "../ui/RestaurantSelector"
import Introduction from "../ui/Introduction"
import StartOrder from "../ui/StartOrder"

// icon imports
import { RiSpeakFill } from "react-icons/ri";

export default function Dashboard() {
    return(
        <div className="text-white text-center w-full h-full"> 
            <div className="flex-2 flex flex-col justify-center items-center gap-3 h-full">
                <Introduction/>
                <RiSpeakFill className="text-white text-3xl"/>
                <RestaurantSelector/>
                <StartOrder/>
            </div>
        </div>
    )
}