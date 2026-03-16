// component imports
import RestaurantSelector from "../components/ui/RestaurantSelector"
import Introduction from "../components/ui/Introduction"
import StartOrder from "../components/ui/StartOrder"

// icon imports
import { RiSpeakFill } from "react-icons/ri";
import { fetchOrders } from "../api/Restaurant";
import {useState} from "react";
import AnswerBox from "../components/ui/AnswerBox";
import OpenCloseButton from "../components/ui/OpenCloseButton";

export default function Dashboard() {
    const [restaurantId, setRestaurantId] = useState(0);
    const [text, setText] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }
    console.log(restaurantId)
    const speak = (text) => {
        const msg = new SpeechSynthesisUtterance(text);
        setIsSpeaking(true)

        msg.onend = () => {
            setIsSpeaking(false);
        }
        
        window.speechSynthesis.speak(msg);
    };

    const getOrder = async () => {
        if (restaurantId === 0) {
            alert("Please choose the restaurant")
        } else {
            const orders = await fetchOrders(restaurantId);
            speak(orders.text);
            setText(orders.text);
        }
    };
    return(
        <div className="text-white text-center w-full h-96"> 
            <div className="flex-2 flex flex-col justify-center items-center gap-5 h-full ">
                <Introduction/>
                <RiSpeakFill className={`text-3xl h-10 ${isSpeaking ? "animate-speaking" : "text-white"}`}/>
                <div className="flex justify-center items-center w-96 h-10 gap-4 ">
                    <RestaurantSelector setRestaurantId={setRestaurantId}/>
                    <StartOrder getOrder={getOrder}/>
                    <OpenCloseButton isOpen={isOpen} handleClose={handleClose} handleOpen={handleOpen}/>
                </div>
                <AnswerBox text={text} isOpen={isOpen}/>
            </div>
        </div>
    )
}