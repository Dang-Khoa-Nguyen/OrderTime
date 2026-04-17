// component imports
import RestaurantSelector from "../components/ui/RestaurantSelector"
import Introduction from "../components/ui/Introduction"
import StartOrder from "../components/ui/StartOrder"
import VoiceController from "../components/controllers/VoiceController";
import SpeedController from "../components/controllers/SpeedController";

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
    const [voiceReading, setVoiceReading] = useState("en-US");
    const [newRate, setNewRate] = useState(1);
    const [newPitch, setNewPitch] = useState(0.7);

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

     const increaseTone = () => {
        if (newPitch >= 1) {
            alert("1 is the maximum")
        } else {
            setNewPitch(parseFloat((newPitch + 0.1).toFixed(1)));
        }
    }

    const decreaseTone = () => {
        if (newPitch == 0.1) {
            alert("0.1 is the minimum")
        } else {
            setNewPitch(parseFloat((newPitch - 0.1).toFixed(1)));
        }
    }

    const increaseSpeed = () => {
        if (newRate >= 1.2) {
            alert("1.2 is the maximum")
        } else {
            setNewRate(parseFloat((newRate + 0.1).toFixed(1)));
        }
    }

    const decreaseSpeed = () => {
        if (newRate == 0.7) {
            alert("0.7 is the minimum")
        } else {
            setNewRate(parseFloat((newRate - 0.1).toFixed(1)));
        }
    }
    console.log(restaurantId)
    // const speak = (text) => {
    //     const msg = new SpeechSynthesisUtterance(text);
    //     const voices = window.speechSynthesis.getVoices();

    //     // Choose voice, speed, and tone
    //     msg.voice = voices.find(voice => voice.lang === voiceReading);
    //     msg.rate =  newRate; 
    //     msg.pitch = newPitch; 

    //     setIsSpeaking(true)

    //     msg.onend = () => {
    //         setIsSpeaking(false);
    //     }
        
    //     window.speechSynthesis.speak(msg);
    // };

    const getOrder = async () => {
        if (restaurantId === 0) {
            alert("Please choose the restaurant")
        } else {
            const res = await fetchOrders({restaurantId: restaurantId, speed: newRate, tone: newPitch});
            setText(res.text);
            const audio = new Audio(`data:audio/mp3;base64,${res.audio}`);
            audio.play();
        }
    };
    return(
        <div className="text-white text-center w-full h-96"> 
            <div className="flex-2 flex flex-col justify-center items-center gap-5 h-full">
                <Introduction/>
                <RiSpeakFill className={`text-3xl h-10 ${isSpeaking ? "animate-speaking" : "text-white"}`}/>
                <div className="flex gap-3">
                    <SpeedController newRate={newRate} decreaseSpeed={decreaseSpeed} increaseSpeed={increaseSpeed}/>
                    <VoiceController newPitch={newPitch} decreaseTone={decreaseTone} increaseTone={increaseTone}/>
                </div>
                <div className="flex justify-center items-center w-full h-10 gap-4">
                    <RestaurantSelector setRestaurantId={setRestaurantId}/>
                    <StartOrder getOrder={getOrder}/>
                    <OpenCloseButton isOpen={isOpen} handleClose={handleClose} handleOpen={handleOpen}/>
                </div>
                <AnswerBox text={text} isOpen={isOpen}/>
            </div>
        </div>
    )
}