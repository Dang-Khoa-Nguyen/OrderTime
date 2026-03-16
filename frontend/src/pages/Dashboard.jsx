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
import IncreaseButton from "../components/ui/IncreaseButton";
import DecreaseButton from "../components/ui/DecreaseButton";

export default function Dashboard() {
    const [restaurantId, setRestaurantId] = useState(0);
    const [text, setText] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voiceReading, setVoiceReading] = useState("en-US");
    const [newRate, setNewRate] = useState(0.9);
    const [newPitch, setNewPitch] = useState(1.1);

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    const increaseSpeed = () => {
        if (newRate >= 1.5) {
            alert("1.5 is the maximum")
        } else {
            setNewRate(newRate+0.1);
        }
    }

    const decreaseSpeed = () => {
        if (newRate == 0.1) {
            alert("0.1 is the minimum")
        } else {
            setNewRate(newRate-0.1);
        }
    }
    console.log(restaurantId)
    const speak = (text) => {
        const msg = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();

        // Choose voice, speed, and tone
        msg.voice = voices.find(voice => voice.lang === voiceReading);
        msg.rate =  newRate; 
        msg.pitch = newPitch; 

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
            <div className="flex justify-center gap-4">
            <DecreaseButton decreaseSpeed={decreaseSpeed}/>
            <div> {newRate} </div>
            <IncreaseButton increaseSpeed={increaseSpeed}/>
            </div> 
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