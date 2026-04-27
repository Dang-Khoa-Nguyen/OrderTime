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
import UserInputBox from "../components/ui/UserInputBox";
import AddAnswerBox from "../components/common/AddAnswerBox";

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
        <div className="text-white text-center w-full">
            <div className="flex justify-center items-center">
                <Introduction/>
            </div> 
            <div className="flex justify-center h-full">
                <div className="flex flex-col justify-center items-center gap-3 bg-gray-700 border border-gray-600 w-1/2 rounded-lg">
                    <RiSpeakFill className={`text-3xl h-10 ${isSpeaking ? "animate-speaking" : "text-white"}`}/>
                    <div className="flex gap-3 w-5/6">
                        <SpeedController newRate={newRate} decreaseSpeed={decreaseSpeed} increaseSpeed={increaseSpeed}/>
                        <VoiceController newPitch={newPitch} decreaseTone={decreaseTone} increaseTone={increaseTone}/>
                    </div>
                    <div className="flex justify-center items-center w-5/6">
                        <RestaurantSelector setRestaurantId={setRestaurantId}/>
                    </div>
                    <div className="flex justify-between items-center h-10 w-5/6 gap-4">
                        <StartOrder getOrder={getOrder}/>
                        <OpenCloseButton isOpen={isOpen} handleClose={handleClose} handleOpen={handleOpen}/>
                    </div>
                    <AnswerBox text={text} isOpen={isOpen}/>
                </div>
            </div>

            <div className="flex justify-center h-full my-5">
                <div className="flex flex-col justify-center items-center gap-3 bg-gray-700 border border-gray-600 w-1/2 rounded-lg">
                    <div className="text-center text-lg"> Write your orders </div>
                    <div className="flex w-5/6 gap-1">
                        <input className="rounded-lg w-10 text-gray-800 text-xs" placeholder="Qty" type="number" min="1"/>
                        <UserInputBox/>
                        <AddAnswerBox/>
                    </div>

                    <div className="w-full flex flex-col items-center justify-center"> 
                        Order Lists
                        <div className=" border border-dashed bg-gray-900 text-xs opacity-50 w-5/6 text-center">
                            No order has made
                        </div>
                    </div>
                    <div className="flex justify-end w-5/6">
                    <button className="bg-blue-600 rounded-lg px-2 py-2 text-sm"> Submit </button>
                    </div>
                </div>
            </div>
        </div>
    )
}